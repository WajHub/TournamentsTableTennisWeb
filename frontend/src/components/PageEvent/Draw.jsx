import {
  SingleEliminationBracket,
  DoubleEliminationBracket,
  Match,
  SVGViewer,
} from "react-tournament-brackets";
import { getGamesInTournament } from "../../utils/api";
import { useWindowSize } from "@uidotdev/usehooks";
import { useState, useEffect } from "react";

function Draw({ tournament }) {
  const size = useWindowSize();
  const finalWidth = Math.max(size.width / 1.5, 500);
  const finalHeight = Math.max(size.height / 1.25, 500);
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
    fetchData(tournament.id);
  }, [tournament]);

  if (!tournament.running) {
    return "Tournament has not started";
  }
  if (isLoading) {
    return "Loading...";
  }

  if (matches.length === 0) {
    return "No matches available";
  }

  return (
    <SingleEliminationBracket
      matches={matches}
      matchComponent={Match}
      svgWrapper={({ children, ...props }) => (
        <SVGViewer width={finalWidth} height={finalHeight} {...props}>
          {children}
        </SVGViewer>
      )}
    />
  );
}

export default Draw;
