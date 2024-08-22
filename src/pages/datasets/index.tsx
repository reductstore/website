import React from "react";
import SimpleHeader from "@site/src/components/SimpleHeader";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";

import ImageCarousel from "@site/src/components/ImageCarousel";

export default function RemoteDatasetsPage(): JSX.Element {
  return (
    <Layout
      title="Playground Datasets"
      description="Explore various image datasets hosted in ReductStore's Time Series Object Store. Access IMDB reviews, cat images, and MNIST digits in this interactive demo."
    >
      <main>
        <SimpleHeader pageTitle="Playground Datasets" />
        <div className="container">
          <p>
            Welcome to the Playground Datasets, where you can explore and use
            annotated images stored in ReductStore's Time Series Object Store.
            These datasets are hosted on a remote server accessible via{" "}
            <b>
              <Link href="https://play.reduct.store">
                https://play.reduct.store
              </Link>
            </b>
            . You can freely access and download these datasets using the access
            token <b>"reductstore"</b>.
          </p>
          <p>Currently, you can browse the following demo datasets:</p>
          <ul>
            <li>
              <b>IMDB Ratings</b>: A dataset containing images related to IMDB
              ratings.
            </li>
            <li>
              <b>Cat Images</b>: A collection of various cat images.
            </li>
            <li>
              <b>MNIST Handwritten Digits</b>: A popular dataset of handwritten
              digits.
            </li>
          </ul>
          <p>
            Each of these datasets comes with labels, making them ideal for
            training and testing deep learning models. You can use these
            datasets to build and tune your models using frameworks like
            PyTorch. For more guidance, check out our in-depth blog post on{" "}
            <b>
              <Link to="/blog/ai/datastreaming/pytorch/implement-database-data-streaming-pytorch">
                implementing data streaming from a remote database in PyTorch
              </Link>
            </b>
            , which walks you through the entire process.
          </p>
          <p>
            To learn more about the datasets or get the code to access them, you
            can visit the{" "}
            <b>
              <Link href="https://github.com/reductstore/datasets">
                dataset repository
              </Link>
            </b>
            .
          </p>
          <p>
            ReductStore isn't just for storing images; it's designed to manage
            blob data that changes over time. This makes it ideal for storing
            and organizing information by specific moments or in a step-by-step
            order. That's why the slider below is called <b>Timeline</b>. Just
            like a timeline in history, it allows you to move through the data
            in the order it was added, from the first item to the last.
          </p>
          <p>
            If you have any questions, suggestions, or need additional datasets,
            feel free to{" "}
            <b>
              <Link to="/contact">contact us</Link>
            </b>{" "}
            or join our{" "}
            <b>
              <Link href="https://community.reduct.store">community forum</Link>
            </b>
            .
          </p>
          <ImageCarousel />
        </div>
      </main>
    </Layout>
  );
}
