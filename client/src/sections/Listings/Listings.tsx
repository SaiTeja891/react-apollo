import React from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { Listings as ListingsData } from "./__generated__/Listings";
import {
  DeleteListing as DeleteListingData,
  DeleteListingVariables,
} from "./__generated__/DeleteListing";
import { Alert, Avatar, Button, List } from "antd";
import { ListingsSkelton } from "./Components";
import "./styles/Listings.css";

// import {
//   Listing,
//   DeleteListingData,
//   DeleteListingVariables,
//   ListingsData,
// } from "./types";

const LISTINGS = gql`
  query Listings {
    listings {
      id
      title
      image
      address
      price
      numOfGuests
      numOfBeds
      numOfBaths
      rating
    }
  }
`;

const DELETE_LISTING = gql`
  mutation DeleteListing($id: ID!) {
    deleteListing(id: $id) {
      id
    }
  }
`;

interface Props {
  title: string;
}

export const Listings = ({ title }: Props) => {
  const { data, loading, error, refetch } = useQuery<ListingsData>(LISTINGS);

  const [
    deleteListing,
    { loading: deleteListingLoading, error: deleteListingError },
  ] = useMutation<DeleteListingData, DeleteListingVariables>(DELETE_LISTING);

  const handleDeleteListing = async (id: string) => {
    await deleteListing({ variables: { id } });
    refetch();
  };

  const listings = data ? data.listings : null;

  // const listingsList = listings ? (
  //   <ul>
  //     {listings.map((listing) => {
  //       return (
  //         <li key={listing.id}>
  //           {listing.title}{" "}
  //           <button onClick={() => handleDeleteListing(listing.id)}>
  //             Delete
  //           </button>
  //         </li>
  //       );
  //     })}
  //   </ul>
  // ) : null;

  const listingsList = listings ? (
    <List
      itemLayout="horizontal"
      dataSource={listings}
      renderItem={(listing) => (
        <List.Item
          actions={[
            <Button
              type="primary"
              onClick={() => handleDeleteListing(listing.id)}
            >
              Delete
            </Button>,
          ]}
        >
          <List.Item.Meta
            avatar={<Avatar src={listing.image} shape="square" size={48} />}
            description={listing.address}
            title={listing.title}
          />
        </List.Item>
      )}
    />
  ) : null;

  if (loading) {
    return (
      <div className="listings">
        <ListingsSkelton title={title} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="listings">
        <ListingsSkelton title={title} error />
      </div>
    );
  }

  const deleteListingLoadingMessage = deleteListingLoading ? (
    <h4>Deletion in progress...</h4>
  ) : null;

  const deleteListingErrorAlert = deleteListingError ? (
    <Alert
      className="listings__alert"
      type="error"
      message="Uh oh! Something went wrong - please try again later :("
    />
  ) : null;

  return (
    <div className="listings">
      {deleteListingErrorAlert}
      <h2>{title}</h2>
      {listingsList}
      {deleteListingLoadingMessage}
    </div>
  );
};
