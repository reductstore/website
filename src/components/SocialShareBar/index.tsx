import React from 'react';
import './SocialShareBar.css'; // Assuming you put the CSS in a separate file

interface SocialShareBarProps {
  url: string;
  title: string;
  description?: string;
}

const SocialShareBar: React.FC<SocialShareBarProps> = ({ url, title, description }) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description || '');

  const openPopup = (href: string) => {
    window.open(href, 'pop-up', 'left=20,top=20,width=500,height=500,toolbar=1,resizable=0');
    return false;
  };

  return (
    <div id="share-bar">
      <div className="share-buttons">
        Share this:
        <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          onClick={() => openPopup(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`)}
          title="Share on Facebook">
          <i className="fa fa-facebook-official share-button"></i>
        </a>
        <a href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
          onClick={() => openPopup(`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`)}
          title="Share on Twitter">
          <i className="fa fa-twitter share-button"></i>
        </a>
        {/* ... Other social media links ... */}
        <a href={`mailto:?subject=${encodedTitle}&body=Check out this site ${encodedUrl}`}
          title="Share via Email">
          <i className="fa fa-envelope share-button"></i>
        </a>
      </div>
    </div>
  );
};

export default SocialShareBar;
