/**
 * docusaurus-plugin-js-sdk-gen/index.js
 * 
 * Plugin for automatic JavaScript SDK documentation generation
 * using jsdoc-to-markdown with TypeScript support
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const jsdoc2md = require('jsdoc-to-markdown');
const glob = require('glob');

let currentProcessingModule = '';

module.exports = function(context, options) {
  const {
    sdkRepo,
    sdkBranch = 'main',
    destination
  } = options;

  const tempDir = path.join('/tmp/build', path.basename(sdkRepo, '.git'));
  const contentDir = path.join(context.siteDir, destination);

  // Helper to scan for all .ts modules (excluding index.ts and test files)
  function scanModules(sdkDir) {
    return [
      ...glob.sync('src/*.ts', { cwd: sdkDir, absolute: true })
        .filter(f => !f.endsWith('index.ts'))
        .map(f => ({ module: path.basename(f, '.ts').toLowerCase(), file: f })),
      ...glob.sync('src/messages/*.ts', { cwd: sdkDir, absolute: true })
        .map(f => ({ module: 'msg/' + path.basename(f, '.ts').toLowerCase(), file: f }))
    ];
  }

  /**
   * Formats TypeScript type references to prevent React component errors in MDX
   * @param {string} typeRef - TypeScript type reference
   * @returns {string} - Safe type reference for MDX
   */
  function formatTypeReference(typeRef) {
    if (!typeRef) return '';
    
    if (typeRef.includes('<') && typeRef.includes('>')) return 'Promise';
    
    if (typeRef.includes('|')) return typeRef.split('|').map(t => t.trim()).join(' or ');
    
    if (/^[A-Z]/.test(typeRef)) {
      const typeLower = typeRef.toLowerCase();
      const typeMap = {
        'bucketsettings': 'settings object',
        'bucketinfo': 'bucket information',
        'entryinfo': 'entry information',
        'writeoptions': 'write options',
        'queryoptions': 'query options',
        'labelmap': 'label map',
      };
      return typeMap[typeLower] || typeLower;
    }
    
    return typeRef;
  }

  /**
   * Formats Markdown output by extracting all information from TypeScript source
   * @param {string} md - TypeScript source code
   * @returns {string} - Formatted Markdown
   */
  function formatMarkdownOutput(md, moduleName) {
    // First, let's get the raw text to work with
    const rawText = md.toString();
    
    // Extract module name from filename
    const moduleNameFromFile = currentProcessingModule.replace(/\..+$/, '');
    
    // Extract class name from the source code
    const classRegex = /export\s+class\s+([A-Za-z0-9_]+)/;
    const classMatch = rawText.match(classRegex);
    const className = classMatch ? classMatch[1] : moduleNameFromFile.charAt(0).toUpperCase() + moduleNameFromFile.slice(1);
    
    // Extract all public properties from the class
    const publicPropRegex = /public\s+readonly\s+([A-Za-z0-9_]+)\s*:\s*([^;=]+)(?:\s*=\s*[^;]+)?;/g;
    let publicProps = [];
    let propMatch;
    while ((propMatch = publicPropRegex.exec(rawText)) !== null) {
      const propName = propMatch[1];
      const propType = propMatch[2].trim();
      
      // Try to extract description from nearby JSDoc if available
      const beforeProp = rawText.substring(0, propMatch.index).split('\n').reverse().join('\n');
      const jsDocMatch = beforeProp.match(/\/\*\*([\s\S]*?)\*\//); 
      const propDesc = jsDocMatch ? 
        jsDocMatch[1].split('\n')
          .map(line => line.trim().replace(/^\*\s*/, ''))
          .filter(line => line && !line.startsWith('@'))
          .join(' ') : 
        `${propName} property`;
      
      publicProps.push({
        name: propName,
        type: propType,
        description: propDesc
      });
    }
    
    // Find class JSDoc comment that comes right before the class declaration
    const classJSDocRegex = /\/\*\*([\s\S]*?)\*\/\s*export\s+class\s+([A-Za-z0-9_]+)/;
    const classJSDocMatch = rawText.match(classJSDocRegex);
    let classDescription = `${className} module for ReductStore HTTP API`;
    
    // If we found a JSDoc comment, extract the description
    if (classJSDocMatch && classJSDocMatch[1] && classJSDocMatch[2] === className) {
      const jsDocContent = classJSDocMatch[1];
      // Find the first non-tag line in the JSDoc comment
      const descLine = jsDocContent.split('\n')
        .map(line => line.trim().replace(/^\*\s*/, ''))
        .filter(line => line && !line.startsWith('@'))[0];
      
      if (descLine) {
        classDescription = descLine;
      }
    }
    
    // Start building our output
    let output = `# ${className}\n\n`;
    output += `${classDescription}\n\n`;
    output += `\`\`\`js\nclass ${className}()\n\`\`\`\n\n`;
    
    // Process constructor
    const constructorRegex = /constructor\s*\(([^)]*)\)[^{]*{/;
    const constructorMatch = rawText.match(constructorRegex);
    
    if (constructorMatch) {
      // Find the JSDoc comment right before the constructor
      const ctorJSDocRegex = /\/\*\*([\s\S]*?)\*\/\s*constructor/;
      const ctorJSDocMatch = rawText.match(ctorJSDocRegex);
      let ctorDescription = 'Constructor';
      
      // Process constructor parameters
      const ctorParamsString = constructorMatch[1] || '';
      const ctorParams = [];
      
      // Split parameters by comma and clean them up
      const rawParams = ctorParamsString.split(',')
        .map(p => p.trim())
        .filter(p => p);
      
      // For each parameter, extract name and find description in JSDoc
      rawParams.forEach(param => {
        // Extract parameter name (before any colon for TypeScript type)
        const paramName = param.split(':')[0].trim();
        let paramDesc = 'Parameter';
        
        // If we have JSDoc for the constructor, look for parameter descriptions
        if (ctorJSDocMatch && ctorJSDocMatch[1]) {
          const jsDoc = ctorJSDocMatch[1];
          // Find @param tag for this parameter
          const paramRegex = new RegExp(`@param\\s+(?:\\{[^}]*\\}\\s+)?${paramName}\\s+-?\\s*([^\\n@]*)`,'i');
          const paramMatch = jsDoc.match(paramRegex);
          if (paramMatch && paramMatch[1]) {
            paramDesc = paramMatch[1].trim();
          }
        }
        
        ctorParams.push({ name: paramName, description: paramDesc });
      });
      
      // Extract constructor description from JSDoc
      if (ctorJSDocMatch && ctorJSDocMatch[1]) {
        const jsDoc = ctorJSDocMatch[1];
        const descLine = jsDoc.split('\n')
          .map(line => line.trim().replace(/^\*\s*/, ''))
          .filter(line => line && !line.startsWith('@'))[0];
        
        if (descLine) {
          ctorDescription = descLine;
        }
      }
      
      // Format constructor documentation
      output += `## __init__\n\n`;
      output += `\`\`\`js\ndef __init__(${ctorParams.map(p => p.name).join(', ')})\n\`\`\`\n\n`;
      output += `${ctorDescription}\n\n`;
      
      // Add parameters section
      if (ctorParams.length > 0) {
        output += `### Arguments:\n\n`;
        ctorParams.forEach(param => {
          output += `- \`${param.name}\` - ${param.description}\n`;
        });
        output += '\n';
      }
      
      // Add properties section if we have any public properties
      if (publicProps.length > 0) {
        output += `## Properties\n\n`;
        publicProps.forEach(prop => {
          output += `### ${prop.name}\n\n`;
          output += `\`\`\`js\n${prop.name}: ${prop.type}\n\`\`\`\n\n`;
          output += `${prop.description}\n\n`;
        });
      }
      
      // Extract example if it exists
      if (ctorJSDocMatch && ctorJSDocMatch[1]) {
        const jsDoc = ctorJSDocMatch[1];
        const exampleMatch = jsDoc.match(/@example\s*([\s\S]*?)(?=\s*@|\s*\*\/)/m);
        if (exampleMatch && exampleMatch[1]) {
          const example = exampleMatch[1].split('\n')
            .map(line => line.trim().replace(/^\*\s*/, ''))
            .join('\n')
            .trim();
          
          if (example) {
            output += `### Example:\n\n\`\`\`js\n${example}\n\`\`\`\n\n`;
          }
        }
      }
    }
    
    // Find all methods with their JSDoc comments
    const methodBlocks = [];
    const methodRegex = /\/\*\*([\s\S]*?)\*\/\s*(async\s+)?([A-Za-z0-9_]+)\s*\(([^)]*)\)/g;
    let methodMatch;
    
    while ((methodMatch = methodRegex.exec(rawText)) !== null) {
      const jsDoc = methodMatch[1];
      const isAsync = !!methodMatch[2];
      const methodName = methodMatch[3];
      const paramsString = methodMatch[4];
      
      // Skip constructor and private methods
      if (methodName === 'constructor' || methodName.startsWith('_')) continue;
      
      // Extract method description from JSDoc
      let methodDescription = `Method ${methodName}`;
      const descLine = jsDoc.split('\n')
        .map(line => line.trim().replace(/^\*\s*/, ''))
        .filter(line => line && !line.startsWith('@'))[0];
      
      if (descLine) {
        methodDescription = descLine;
      }
      
      // Process parameters
      const params = [];
      const rawParams = paramsString.split(',')
        .map(p => p.trim())
        .filter(p => p);
      
      rawParams.forEach(param => {
        // Extract parameter name (before any colon for TypeScript type)
        const paramName = param.split(':')[0].trim();
        
        // Try to extract parameter description from JSDoc, but avoid TypeScript type syntax
        const paramDescMatch = jsDoc.match(new RegExp(`@param\\s+(?:\\{([^}]*)\\}\\s+)?${paramName}\\s+-?\\s*([^\n@]*)`,'i'));
        let paramDesc = paramDescMatch && paramDescMatch[2] ? paramDescMatch[2].trim() : 'Parameter';
        
        // Format parameter descriptions, but avoid using TypeScript type syntax
        // that could be interpreted as React components in MDX
        let formattedParamDesc = paramDesc || '';
        
        // Remove any TypeScript type annotations in curly braces to prevent MDX React component errors
        formattedParamDesc = formattedParamDesc.replace(/\{([^}]+)\}/g, ''); 

        // Format optional parameters
        const paramNameWithOptional = param + (param.includes('?') ? '?' : '');
        
        // Add parameter to the params array without TypeScript type annotation
        params.push({ name: paramNameWithOptional, description: formattedParamDesc.trim() });
      });
      
      // Extract return type and description
      let returnType = 'Promise';
      let returnDesc = 'the result';
      
      // Look for return type in JSDoc
      const returnRegex = /@returns?\s+\{([^}]*)\}\s*-?\s*([^\n@]*)/i;
      const returnMatch = jsDoc.match(returnRegex);
      if (returnMatch) {
        returnType = returnMatch[1].trim();
        if (returnMatch[2]) {
          returnDesc = returnMatch[2].trim();
        }
      }
      
      // Format the return type to prevent React component errors
      returnType = formatTypeReference(returnType);
      
      // Extract throws/raises information
      let throwsType = 'Error';
      let throwsDesc = 'if there is an HTTP error';
      
      const throwsRegex = /@throws?\s+\{([^}]*)\}\s*-?\s*([^\n@]*)/i;
      const throwsMatch = jsDoc.match(throwsRegex);
      if (throwsMatch) {
        throwsType = throwsMatch[1].trim();
        if (throwsMatch[2]) {
          throwsDesc = throwsMatch[2].trim();
        }
      } else if (jsDoc.includes('@throws') || jsDoc.includes('@throw')) {
        throwsType = 'APIError';
      }
      
      // Extract example if it exists
      let example = null;
      const exampleMatch = jsDoc.match(/@example\s*([\s\S]*?)(?=\s*@|\s*\*\/)/m);
      if (exampleMatch && exampleMatch[1]) {
        example = exampleMatch[1].split('\n')
          .map(line => line.trim().replace(/^\*\s*/, ''))
          .join('\n')
          .trim();
      }
      
      // Add to method blocks
      methodBlocks.push({
        name: methodName,
        isAsync,
        description: methodDescription,
        params,
        returnType,
        returnDesc,
        throwsType,
        throwsDesc,
        example
      });
    }
    
    methodBlocks.forEach(method => {
      const paramList = method.params.map(p => p.name).join(', ');
      const signature = `${method.isAsync ? 'async ' : ''}${method.name}(${paramList})`;
      const formattedReturnType = formatTypeReference(method.returnType);
      const returnTypeDisplay = formattedReturnType.toLowerCase() === 'promise' ? 
        `\`Promise\` - ${method.returnDesc}` : `${formattedReturnType} - ${method.returnDesc}`;
      
      let methodOutput = `## ${method.name}\n\n`;
      methodOutput += `\`\`\`js\n${signature}\n\`\`\`\n\n${method.description}\n\n`;
      
      if (method.params.length > 0) {
        methodOutput += `### Arguments:\n\n${method.params.map(p => `- \`${p.name}\` - ${p.description}`).join('\n')}\n\n`;
      }
      
      methodOutput += `### Returns:\n\n- ${returnTypeDisplay}\n\n`;
      methodOutput += `### Raises:\n\n- \`${method.throwsType}\` - ${method.throwsDesc}\n\n`;
      
      if (method.example) {
        methodOutput += `### Example:\n\n\`\`\`js\n${method.example}\n\`\`\`\n\n`;
      }
      
      output += methodOutput;
    });
    
    return output;
  }

  // Helper to add Docusaurus frontmatter and component definitions
  function addHeader(module, title, content) {
    const readableTitle = title.replace(' Module', '');
    
    // Extract all capitalized type names from the content and create React components
    const typeRegex = /(?:[:{]\s*)([A-Z][a-zA-Z0-9]+)(?:\??\s*[|}]|\s*>)/g;
    const typeNames = new Set();
    let match;
    
    while ((match = typeRegex.exec(content)) !== null) {
      if (match[1]) typeNames.add(match[1]);
    }
    
    // Create component definitions string
    const componentDefs = typeNames.size > 0 ? 
      `\nimport React from 'react';\n\n{/* Prevent MDX errors */}\n${[...typeNames].map(type => `const ${type} = () => null;`).join('\n')}\n\n` : '';
    
    return `---\ntitle: ${readableTitle}\ndescription: API reference for the ${readableTitle} of the ReductStore Client SDK for JavaScript.\nslug: /sdk/js/${module.toLowerCase()}\n---\n<head>\n  <link rel="canonical" href="https://www.reduct.store/docs/sdk/js/${module.toLowerCase()}" />\n</head>\n${componentDefs}${content}`;
  }

  // Helper to generate the main index.mdx file for the JS SDK
  async function generateMainIndex(contentDir, tempDir) {
    // Try to use README.md from the SDK repo, fallback to a template
    let readme = '';
    try {
      readme = fs.readFileSync(path.join(tempDir, 'README.md'), 'utf8');
    } catch (e) {
      readme = '# ReductStore Client SDK for JavaScript\n\nAPI Reference.';
    }
    // Bold MD links but not images
    readme = readme.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, p1, p2) => {
      if (p1.startsWith('!')) return `[${p1}](${p2})`;
      return `**[${p1}](${p2})**`;
    });
    const content = `---\ntitle: ReductStore Client SDK\ndescription: API reference for the ReductStore Client SDK for JavaScript.\nslug: /sdk/js\n---\n\n<head>\n  <link rel=\"canonical\" href=\"https://www.reduct.store/docs/sdk/js\" />\n</head>\n\n${readme}\n\n## Modules\n\nimport DocCardList from '@theme/DocCardList';\n\n<DocCardList />\n`;
    fs.writeFileSync(path.join(contentDir, 'index.mdx'), content);
  }

  // Helper to generate module documentation directly from TypeScript files
  async function generateModuleDocumentation(module, moduleDir, tempDir) {
    // Set the current module being processed globally
    currentProcessingModule = module;
    
    const moduleParts = module.split('/');
    let file = tempDir;
    
    // Construct the path to the TypeScript file
    for (let i = 0; i < moduleParts.length; i++) {
      let part = moduleParts[i];
      if (i === moduleParts.length - 1) {
        // Try to find the right casing for the file
        const possibleFilenames = [
          // Standard PascalCase for TypeScript files
          part.charAt(0).toUpperCase() + part.slice(1) + '.ts',
          // All uppercase for constants
          part.toUpperCase() + '.ts',
          // Original case
          part + '.ts'
        ];
        
        let found = false;
        for (const filename of possibleFilenames) {
          const filePath = path.join(file, 'src', filename);
          if (fs.existsSync(filePath)) {
            file = filePath;
            found = true;
            break;
          }
        }
        
        if (!found) {
          // If we're in a subdirectory like 'messages', try that path
          const lastDir = moduleParts[i - 1] || '';
          const subDirMappings = {
            'msg': 'messages'
          };
          const subDir = subDirMappings[lastDir] || lastDir;
          
          for (const filename of possibleFilenames) {
            const filePath = path.join(file, 'src', subDir, filename);
            if (fs.existsSync(filePath)) {
              file = filePath;
              found = true;
              break;
            }
          }
          
          if (!found) {
            // If still not found, use a default
            file = path.join(file, 'src', part.charAt(0).toUpperCase() + part.slice(1) + '.ts');
          }
        }
      } else {
        file = path.join(file, 'src', part);
      }
    }
    
    const title = moduleParts.map(
      part => part.charAt(0).toUpperCase() + part.slice(1)
    ).join(' ');
    
    let md = '';
    try {
      // Read the TypeScript file directly
      if (fs.existsSync(file)) {
        const sourceCode = fs.readFileSync(file, 'utf8');
        
        // Extract documentation directly from the source code
        md = formatMarkdownOutput(sourceCode);
        md = addHeader(module, title, md);
        
        console.log(`[PLUGIN] Generated documentation for module: ${module}`);
      } else {
        console.error(`[PLUGIN] Source file not found: ${file}`);
        md = addHeader(module, title, `Documentation could not be generated for this module. (Source file not found: ${path.basename(file)})`);
      }
    } catch (err) {
      console.error(`[PLUGIN] Error processing module: ${module}`);
      console.error(err);
      md = addHeader(module, title, 'Documentation could not be generated for this module.');
    }
    
    fs.writeFileSync(path.join(moduleDir, 'index.mdx'), md);
  }

  // Helper to generate category index (for e.g. msg/)
  async function generateCategoryIndex(category, categoryDir) {
    const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1);
    const indexContent = `---\ntitle: ${categoryTitle} Modules\ndescription: API reference for the ${categoryTitle} modules of the ReductStore Client SDK for JavaScript.\nslug: /sdk/js/${category}\n---\n\n# ${categoryTitle} Modules\n\nThis section contains documentation for the ${category} modules in the ReductStore Client SDK for JavaScript.\n`;
    fs.writeFileSync(path.join(categoryDir, 'index.mdx'), indexContent);
  }

  // Helper to generate documentation for modules in a category
  async function generateCategoryModuleDocumentation(category, module, categoryDir, tempDir) {
    const moduleDir = path.join(categoryDir, module);
    if (!fs.existsSync(moduleDir)) {
      fs.mkdirSync(moduleDir, { recursive: true });
    }
    let md = '';
    
    // Based on the logs, we know the exact filenames in the repository
    // Let's map each module to its actual filename in the repository
    const exactFileMap = {
      'msg/bucketinfo': path.join(tempDir, 'src', 'messages', 'BucketInfo.ts'),
      'msg/bucketsettings': path.join(tempDir, 'src', 'messages', 'BucketSettings.ts'),
      'msg/diagnostics': path.join(tempDir, 'src', 'messages', 'Diagnostics.ts'),
      'msg/entryinfo': path.join(tempDir, 'src', 'messages', 'EntryInfo.ts'),
      'msg/queryentry': path.join(tempDir, 'src', 'messages', 'QueryEntry.ts'),
      'msg/replicationinfo': path.join(tempDir, 'src', 'messages', 'ReplicationInfo.ts'),
      'msg/replicationsettings': path.join(tempDir, 'src', 'messages', 'ReplicationSettings.ts'),
      'msg/serverinfo': path.join(tempDir, 'src', 'messages', 'ServerInfo.ts'),
      'msg/token': path.join(tempDir, 'src', 'messages', 'Token.ts')
    };
    
    // Initialize file variable
    let file = null;
    
    // Directly get the exact file path from the map if available
    const exactFilePath = exactFileMap[`${category}/${module}`];
    if (exactFilePath) {
      console.log(`[PLUGIN] Using exact file path for ${category}/${module}: ${exactFilePath}`);
      file = exactFilePath;
    } else {
      // Fallback to dynamic path construction if not in our map
      console.log(`[PLUGIN] No exact path found for ${category}/${module}, using dynamic resolution`);
      
      // Mapping from our category names to directory names in the source code
      const categoryMapping = {
        'msg': 'messages'
      };
      
      // Use the mapped category name if it exists
      const sourceCategory = categoryMapping[category] || category;
      
      // Try different capitalization patterns as fallback
      const possiblePaths = [];
      
      // For message modules, try different capitalization patterns
      if (category === 'msg') {
        // Try to PascalCase the module name
        const pascalCaseModule = module
          .split(/[-_]/) // Split by hyphens or underscores
          .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize first letter of each word
          .join(''); // Join without separators
        
        possiblePaths.push(path.join(tempDir, 'src', sourceCategory, pascalCaseModule + '.ts'));
      } else {
        // For standard modules, try a few different paths
        possiblePaths.push(path.join(tempDir, 'src', module, 'index.ts'));
        possiblePaths.push(path.join(tempDir, 'src', module + '.ts'));
        possiblePaths.push(path.join(tempDir, 'src', module.charAt(0).toUpperCase() + module.slice(1) + '.ts'));
      }
      
      // Debug log
      console.log(`[PLUGIN] Trying these paths for ${category}/${module}:`, possiblePaths);
      
      // Find the first file that exists from the possible paths
      for (const possiblePath of possiblePaths) {
        if (fs.existsSync(possiblePath)) {
          file = possiblePath;
          break;
        }
      }
      
      // If no file was found, default to the first one for error reporting
      if (!file && possiblePaths.length > 0) {
        file = possiblePaths[0];
        console.warn(`[PLUGIN] Could not find file for module ${category}/${module}. Tried: ${possiblePaths.join(', ')}`);
      }
    }
    // We've already set the file variable in the code above, so no need to search again
    
    try {
      // If the file exists, read it directly instead of using jsdoc2md
      if (fs.existsSync(file)) {
        // Read the source code
        const sourceCode = fs.readFileSync(file, 'utf8');
        
        // Set the current processing module for formatMarkdownOutput
        currentProcessingModule = `${category}/${module}`;
        
        // Generate markdown using our custom parser (same as for client module)
        md = formatMarkdownOutput(sourceCode);
        md = addHeader(`${category}/${module}`, `${module.charAt(0).toUpperCase() + module.slice(1)} ${category.charAt(0).toUpperCase() + category.slice(1)}`, md);
        
        console.log(`[PLUGIN] Generated documentation for module: ${category}/${module}`);
      } else {
        console.error(`[PLUGIN] Source file not found for module: ${category}/${module}`);
        md = addHeader(`${category}/${module}`, `${module.charAt(0).toUpperCase() + module.slice(1)} ${category.charAt(0).toUpperCase() + category.slice(1)}`, 'Documentation could not be generated for this module. (Source file not found)');
      }
    } catch (err) {
      console.error(`[PLUGIN] Error processing module: ${category}/${module}`);
      console.error(err);
      md = addHeader(`${category}/${module}`, `${module.charAt(0).toUpperCase() + module.slice(1)} ${category.charAt(0).toUpperCase() + category.slice(1)}`, 'Documentation could not be generated for this module.');
    }
    fs.writeFileSync(path.join(moduleDir, 'index.mdx'), md);
  }

  function copyDirSync(src, dest) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    
    fs.readdirSync(src, { withFileTypes: true }).forEach(entry => {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);
      
      entry.isDirectory() ? copyDirSync(srcPath, destPath) : fs.copyFileSync(srcPath, destPath);
    });
  }

  return {
    name: 'docusaurus-plugin-js-sdk-gen',

    async loadContent() {
      console.log("[PLUGIN] JavaScript SDK plugin loaded");
      
      try {
        // CRITICAL: Create placeholder files for 1.15.x version FIRST
        // This must happen before Docusaurus validation
        try {
          const versionsJson = require(path.join(context.siteDir, 'versions.json'));
          const latestVersion = versionsJson.find(v => v.startsWith('1.15'));
          
          if (latestVersion) {
            const sidebarPath = path.join(context.siteDir, 'versioned_sidebars', `version-${latestVersion}-sidebars.json`);
            if (fs.existsSync(sidebarPath)) {
              const sidebarContent = fs.readFileSync(sidebarPath, 'utf8');
              
              if (sidebarContent.includes('sdk/js/index') || sidebarContent.includes('"JavaScript Client"')) {
                console.log(`[PLUGIN] Creating placeholder JS SDK docs for version ${latestVersion}`);
                
                // Create placeholder files for each required module
                const versionedDocsPath = path.join(context.siteDir, 'versioned_docs', `version-${latestVersion}`, 'sdk/js');
                const requiredPaths = [
                  'index.mdx',
                  'client/index.mdx',
                  'bucket/index.mdx',
                  'record/index.mdx',
                  'msg/serverinfo/index.mdx',
                  'msg/bucketinfo/index.mdx',
                  'msg/bucketsettings/index.mdx',
                  'msg/diagnostics/index.mdx',
                  'msg/entryinfo/index.mdx',
                  'msg/queryentry/index.mdx',
                  'msg/replicationinfo/index.mdx',
                  'msg/replicationsettings/index.mdx',
                  'msg/token/index.mdx'
                ];
                
                for (const filePath of requiredPaths) {
                  const fullPath = path.join(versionedDocsPath, filePath);
                  const dirPath = path.dirname(fullPath);
                  
                  if (!fs.existsSync(dirPath)) {
                    fs.mkdirSync(dirPath, { recursive: true });
                  }
                  
                  if (!fs.existsSync(fullPath)) {
                    const pathParts = filePath.split('/');
                    const title = pathParts[0] === 'index.mdx' ? 'JavaScript SDK' : 
                                 pathParts.length === 3 ? `${pathParts[1].charAt(0).toUpperCase() + pathParts[1].slice(1)} ${pathParts[0].charAt(0).toUpperCase() + pathParts[0].slice(1)}` :
                                 `${pathParts[0].charAt(0).toUpperCase() + pathParts[0].slice(1)}`;
                    
                    fs.writeFileSync(fullPath, `---\ntitle: ${title}\n---\n\n# ${title}\n\nPlaceholder documentation. Will be replaced with actual content.`);
                  }
                }
                
                console.log(`[PLUGIN] Created placeholder JS SDK docs for version ${latestVersion}`);
              }
            }
          }
        } catch (err) {
          console.error("[PLUGIN] Error creating placeholder files:", err);
        }
        
        // Clone the repository if it doesn't exist
        console.log(`[PLUGIN] Fetching source code from ${sdkRepo}#${sdkBranch} to ${tempDir}`);
        if (!fs.existsSync(tempDir)) {
          fs.mkdirSync(tempDir, { recursive: true });
          execSync(`git clone --depth 1 --branch ${sdkBranch} ${sdkRepo} ${tempDir}`, { stdio: 'inherit' });
        } else {
          execSync(`cd ${tempDir} && git pull origin ${sdkBranch}`, { stdio: 'inherit' });
        }
        
        // Ensure destination directory exists
        if (!fs.existsSync(contentDir)) {
          fs.mkdirSync(contentDir, { recursive: true });
        }

        // Always write jsdoc.json for TypeScript support
        const jsdocConfigPath = path.join(tempDir, 'jsdoc.json');
        if (!fs.existsSync(jsdocConfigPath)) {
          fs.writeFileSync(jsdocConfigPath, JSON.stringify({
            plugins: ["node_modules/jsdoc-babel"],
            babel: {
              extensions: ["ts"],
              presets: ["@babel/preset-env", "@babel/preset-typescript"]
            },
            source: {
              includePattern: ".+\\.(js|ts)$"
            }
          }, null, 2));
        }

        // Scan modules after repo is ready
        const modules = await scanModules(tempDir);
        console.log("[PLUGIN] Modules found:", modules);

        // Define additionalModules if needed (customize as needed)
        let additionalModules = {};
        try {
          // Example: scan for message modules
          const msgModules = glob.sync('src/msg/*.ts', { cwd: tempDir, absolute: true })
            .map(f => path.basename(f, '.ts').toLowerCase());
          if (msgModules.length > 0) {
            additionalModules['msg'] = msgModules;
          }
        } catch (err) {
          console.error("[PLUGIN] Error scanning additional modules:", err);
        }
        console.log("[PLUGIN] Additional modules:", additionalModules);

        // Generate main index.mdx file
        try {
          await generateMainIndex(contentDir, tempDir);
          console.log("[PLUGIN] Main index.mdx generated");
        } catch (err) {
          console.error("[PLUGIN] Error generating main index.mdx:", err);
        }

        // Generate documentation for each regular module
        for (const { module } of modules) {
          console.log(`[PLUGIN] Generating documentation for module: ${module}`);
          const moduleDir = path.join(contentDir, module.split('/')[0]);
          if (!fs.existsSync(moduleDir)) {
            fs.mkdirSync(moduleDir, { recursive: true });
          }

          if (module.includes('/')) {
            // It's a categorized module (e.g. msg/token)
            const [category, subModule] = module.split('/');
            const categoryDir = path.join(contentDir, category);
            if (!fs.existsSync(categoryDir)) {
              fs.mkdirSync(categoryDir, { recursive: true });
              await generateCategoryIndex(category, categoryDir);
            }
            await generateCategoryModuleDocumentation(category, subModule, categoryDir, tempDir);
          } else {
            // It's a normal module (e.g. client)
            const moduleDir = path.join(contentDir, module);
            if (!fs.existsSync(moduleDir)) {
              fs.mkdirSync(moduleDir, { recursive: true });
            }
            await generateModuleDocumentation(module, moduleDir, tempDir);
          }
          console.log(`[PLUGIN] Generated documentation for module: ${module}`);
        }

        return {};
      } catch (error) {
        console.error('[PLUGIN] Error generating JavaScript SDK documentation:', error);
        return {};
      }
    },

    async contentLoaded({ content, actions }) {
      // Copy to versioned docs if they exist
      try {
        const versionsJson = require(path.join(context.siteDir, 'versions.json'));
        if (versionsJson && versionsJson.length > 0) {
          const latestVersion = versionsJson[0]; // First version is the latest
          const versionedDocsPath = path.join(context.siteDir, 'versioned_docs', `version-${latestVersion}`, 'sdk/js');

          if (!fs.existsSync(versionedDocsPath)) {
            fs.mkdirSync(versionedDocsPath, { recursive: true });
          }

          // Copy generated documentation to versioned docs
          copyDirSync(contentDir, versionedDocsPath);
          console.log(`[PLUGIN] Copied documentation to versioned docs: ${versionedDocsPath}`);
        }
      } catch (err) {
        console.error("[PLUGIN] Error copying files to versioned docs:", err);
      }
    }
  };
};
