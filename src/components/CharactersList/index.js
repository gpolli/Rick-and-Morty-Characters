import React from 'react';
/* Components */
import CharacterCard from '../CharacterCard';
/* Helpers */
import { objectIsEmpty } from '../../helpers/utils';
/* Style */
import './style.css';

const CharactersList = ({ parentClass, content = { characters: [], location: [], episodes: [] } }) => {
  const { characters } = content;

  const getEpisodesIndexes = (episodes) => {
    if (episodes.length) {
      const regex = /[0-9]+/;

      return episodes.map(episode => episode.match(regex)[0]);
    }

    return [];
  }

  const getEpisodesInfo = (indexesList, episodes) => {
    if (indexesList.length) {
      return indexesList.map(index => {
        return { name: episodes[index].name, episode: episodes[index].episode }
      })
    }

    return [];
  }

  const setCardContent = (character, data) => {
    const { image, name, status, species, type, gender, origin, location, episode: episodes } = character;
    const { name: originName } = origin;
    const { name: locationName } = location;

    if (data.hasOwnProperty('locations') && data.hasOwnProperty('episodes')) {
      // console.log('episodes: ', originName, locationName);

      return {
        static: {
          image,
          name,
        },
        dynamic: {
          profile: {
            status,
            species,
            type,
            gender,
          },
          origin: {
            name: originName !== "unknown" ? originName : "Unknown",
            dimension: originName !== "unknown" ? data['locations'][originName]['dimension'] : "Unknown",
            type: originName !== "unknown" ? data['locations'][originName]['type'] : "Unknown",
            'amount of residents': originName !== "unknown" ? data['locations'][originName]['residents'].length : "Unknown",
          },
          location: {
            name: locationName !== "unknown" ? locationName : "Unknown",
            dimension: locationName !== "unknown" ? data['locations'][locationName]['dimension'] : "Unknown",
            type: locationName !== "unknown" ? data['locations'][locationName]['type'] : "Unknown",
            'amount of residents': locationName !== "unknown" ? data['locations'][locationName]['residents'].length : "Unknown",
          },
          episodes: getEpisodesInfo(getEpisodesIndexes(episodes), data['episodes']),
        }
      }
    }

    if (data.hasOwnProperty('locations')) {
      // console.log('locations: ', originName, locationName);

      return {
        static: {
          image,
          name,
        },
        dynamic: {
          profile: {
            status,
            species,
            type,
            gender,
          },
          origin: {
            name: originName !== "unknown" ? originName : "Unknown",
            dimension: originName !== "unknown" ? data['locations'][originName]['dimension'] : "Unknown",
            type: originName !== "unknown" ? data['locations'][originName]['type'] : "Unknown",
            'amount of residents': originName !== "unknown" ? data['locations'][originName]['residents'].length : "Unknown",
          },
          location: {
            name: locationName !== "unknown" ? locationName : "Unknown",
            dimension: locationName !== "unknown" ? data['locations'][locationName]['dimension'] : "Unknown",
            type: locationName !== "unknown" ? data['locations'][locationName]['type'] : "Unknown",
            'amount of residents': locationName !== "unknown" ? data['locations'][locationName]['residents'].length : "Unknown",
          },
          episodes: [],
        }
      }
    }

    return {
      static: {
        image,
        name,
      },
      dynamic: {
        profile: {
          status,
          species,
          type,
          gender,
        },
        origin: {},
        location: {},
        episodes: [],
      }
    }
  }

  return (
    <section className={`${parentClass ? parentClass : ''}`}>
      {
        characters.length
          ? characters.map(character => (<CharacterCard character={character} content={setCardContent(character, content)} parentClass="characters-list__character-item" />))
          : "No characters found"
      }
    </section>
  );
}

export default CharactersList;
