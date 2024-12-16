import {
  SingleEliminationBracket,
  DoubleEliminationBracket,
  Match,
  SVGViewer,
} from "react-tournament-brackets";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import { getGamesInTournament } from "../../../utils/api.js";
import { useWindowSize } from "@uidotdev/usehooks";
import { useState, useEffect } from "react";

function Draw({ tournament }) {
  const size = useWindowSize();
  const finalWidth = Math.max(size.width / 1.5, 500);
  const finalHeight = Math.max(size.height / 1.2, 500);
  const [matches, setMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = (id) => {
    getGamesInTournament(id)
      .then((result) => {
        setMatches(result.data || []);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if(tournament.id ) fetchData(tournament.id);

  }, [tournament]);

  if (isLoading || !tournament.id) {
    return "Loading...";
  }

  if (!tournament.running) {
    return "Tournament has not started";
  }

  if (matches.length === 0) {
    return "No matches available";
  }

  return (
      <TransformWrapper
          initialScale={1}
          maxPositionY={2}
          maxPositionX={2}
          minScale={0.5}
          maxScale={2}
      >
        <TransformComponent
            wrapperStyle={{ maxHeight: `${finalHeight}px`, overflow: 'hidden' }}
            contentStyle={{ maxHeight: '100%', overflowY: 'auto' }}
        >
          <SingleEliminationBracket
              matches={matches}
              matchComponent={Match}
          />
        </TransformComponent>
      </TransformWrapper>




  );
}

export default Draw;
