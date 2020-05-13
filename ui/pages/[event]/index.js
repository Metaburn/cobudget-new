import gql from "graphql-tag";
import { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import Link from "next/link";
import DreamCard from "../../components/DreamCard";
import HappySpinner from "../../components/HappySpinner";
import Filterbar from "../../components/Filterbar";

export const DREAMS_QUERY = gql`
  query Dreams($eventId: ID!, $textSearchTerm: String, $unpublished: Boolean) {
    dreams(
      eventId: $eventId
      textSearchTerm: $textSearchTerm
      unpublished: $unpublished
    ) {
      id
      slug
      description
      summary
      title
      minGoalGrants
      maxGoalGrants
      currentNumberOfGrants
      numberOfComments
      favorite
      published
      images {
        small
        large
      }
    }
  }
`;

export default ({ currentUser, event }) => {
  if (!event) return null;
  const [filterFavorites, setFilterFavorites] = useState(false);
  const [textSearchTerm, setTextSearchTerm] = useState("");
  const toggleFilterFavorites = () => setFilterFavorites(!filterFavorites);

  const [seeUnpublished, setSeeUnpublished] = useState(false);
  const toggleSeeUnpublished = () => setSeeUnpublished(!seeUnpublished);

  let { data: { dreams } = { dreams: [] }, loading, error } = useQuery(
    DREAMS_QUERY,
    {
      variables: {
        eventId: event.id,
        textSearchTerm,
        unpublished: seeUnpublished,
      },
    }
  );

  if (filterFavorites) {
    dreams = dreams.filter((dream) => dream.favorite);
  }

  return (
    <>
      <Filterbar
        filterFavorites={filterFavorites}
        toggleFilterFavorites={toggleFilterFavorites}
        seeUnpublished={seeUnpublished}
        toggleSeeUnpublished={toggleSeeUnpublished}
        textSearchTerm={textSearchTerm}
        setTextSearchTerm={setTextSearchTerm}
        currentUser={currentUser}
      />

      {loading ? (
        <div className="flex-grow flex justify-center items-center">
          <HappySpinner />
        </div>
      ) : (
        <>
          {dreams.length ? (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {dreams.map((dream) => (
                <Link
                  href="/[event]/[dream]"
                  as={`/${event.slug}/${dream.slug}`}
                  key={dream.slug}
                >
                  <a className="flex focus:outline-none focus:shadow-outline rounded-lg">
                    <DreamCard
                      dream={dream}
                      event={event}
                      currentUser={currentUser}
                    />
                  </a>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex-grow flex flex-col justify-center items-center">
              <h1 className="text-3xl text-gray-500 text-center">
                No dreams...
              </h1>
            </div>
          )}
        </>
      )}
    </>
  );
};