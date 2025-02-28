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
  const matches = tournament.games;


  if (!tournament.running) {
    return "Tournament has not started";
  }

  if (matches.length === 0) {
    return "No matches available";
  }

  return (
      <TransformWrapper
          initialScale={1}
          minScale={0.5}
          maxScale={2}
          centerZoomedOut={true}
          limitToBounds={true}
          centered={true}
      >
        <TransformComponent
            wrapperStyle={{
              maxHeight: `${finalHeight}px`,
              maxWidth: `${finalWidth}px`,
              overflow: "hidden",
            }}
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
