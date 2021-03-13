import React from 'react';
/* Components */
import CharacterCard from '../CharacterCard';
/* Helpers */
import { capitalizeFirstLetter } from '../../helpers/utils';
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

    const presets = {
      static: {
        image,
        name,
      },
      dynamic: {
        profile: {
          status: status ? capitalizeFirstLetter(status) : "Unknown",
          species: species ? capitalizeFirstLetter(species) : "Unknown",
          type: type ? capitalizeFirstLetter(type) : "Unknown",
          gender: gender ? capitalizeFirstLetter(gender) : "Unknown",
        },
        origin: {},
        location: {},
        episodes: [],
      }
    };

    if (data.hasOwnProperty('locations')) {
      presets.dynamic.origin = {
        name: originName !== "unknown" ? capitalizeFirstLetter(originName) : "Unknown",
        dimension: (data.locations?.[originName] && data.locations?.[originName]['dimension']) ? capitalizeFirstLetter(data['locations'][originName]['dimension']) : "Unknown",
        type: (data.locations?.[originName] && data.locations?.[originName]['type']) ? capitalizeFirstLetter(data['locations'][originName]['type']) : "Unknown",
        'amount of residents': (data.locations?.[originName] && data.locations?.[originName]['residents'] && Array.isArray(data.locations?.[originName]['residents'])) ? data['locations'][originName]['residents'].length : "Unknown",
      };

      presets.dynamic.location = {
        name: locationName !== "unknown" ? capitalizeFirstLetter(locationName) : "Unknown",
        dimension: (data.locations?.[locationName] && data.locations?.[locationName]['dimension']) ? capitalizeFirstLetter(data['locations'][locationName]['dimension']) : "Unknown",
        type: (data.locations?.[locationName] && data.locations?.[locationName]['type']) ? capitalizeFirstLetter(data['locations'][locationName]['type']) : "Unknown",
        'amount of residents': (data.locations?.[locationName] && data.locations?.[locationName]['residents'] && Array.isArray(data.locations?.[locationName]['residents'])) ? data['locations'][locationName]['residents'].length : "Unknown",
      };
    }

    if (data.hasOwnProperty('episodes')) {
      presets.dynamic.episodes = data['episodes'] ? getEpisodesInfo(getEpisodesIndexes(episodes), data['episodes']) : [];
    }

    return {
      static: presets.static,
      dynamic: {
        profile: presets['dynamic']['profile'],
        origin: presets['dynamic']['origin'],
        location: presets['dynamic']['location'],
        episodes: presets['dynamic']['episodes'],
      }
    }
  }

  return (
    <section className={`${parentClass ? parentClass : ''} character-list`}>
      {
        characters.length
          ? characters.map(character => (<CharacterCard character={character} content={setCardContent(character, content)} parentClass="characters-list__character-item" />))
          : "No characters found"
      }
    </section>
  );
}

export default CharactersList;
