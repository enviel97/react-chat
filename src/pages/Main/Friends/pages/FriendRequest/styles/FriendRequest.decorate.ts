import { FriendPageNotificationEmpty } from "@pages/Main/Friends/styles/FriendPage.decorate";
import { breakpoint } from "@theme/helper/breakpoint";
import { clampSize } from "@theme/helper/tools";
import styled from "styled-components";

export const FriendRequestContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const FriendRequestItemsContainer = styled.div`
  position: relative;
  display: inline-grid;
  grid-gap: 0.5em;
  padding-bottom: 10svh;
  grid-template-columns: repeat(
    8,
    minmax(
      auto,
      ${clampSize({
        minFontSize: 12.45,
        maxFontSize: 13.45,
        minWidth: 124.656,
        maxWidth: 179.188,
      })}
    )
  );

  ${breakpoint.down("laptop")} {
    grid-template-columns: repeat(
      5,
      minmax(
        auto,
        ${clampSize({
          minFontSize: 12.45,
          maxFontSize: 13.45,
          minWidth: 124.656,
          maxWidth: 179.188,
        })}
      )
    );
  }
  ${breakpoint.down("tablet")} {
    grid-template-columns: repeat(
      3,
      minmax(
        auto,
        ${clampSize({
          minFontSize: 12.45,
          maxFontSize: 13.45,
          minWidth: 124.656,
          maxWidth: 179.188,
        })}
      )
    );
  }
  ${breakpoint.down("mobile")} {
    grid-template-columns: repeat(
      1,
      minmax(
        auto,
        ${clampSize({
          minFontSize: 12.45,
          maxFontSize: 13.45,
          minWidth: 124.656,
          maxWidth: 179.188,
        })}
      )
    );
  }

  & ${FriendPageNotificationEmpty} {
    grid-column: 8 span;
  }
`;
