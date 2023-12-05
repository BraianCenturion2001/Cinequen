import React, { useEffect } from "react";
import { Loader } from "semantic-ui-react";
import { useCanjes, useAuth } from "../../hooks";
import { TablaCanjes } from "../../components/Client";
import { Box } from "@mui/material";

export function Canjes() {
  const { canjes, getCanjes, loading } = useCanjes();
  const { auth } = useAuth();

  useEffect(() => {
    const userId = auth.me.user_id;
    getCanjes({ user: userId });
    document.title = "Mis Canjes";
  }, []);

  return (
    <>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "500px",
          }}
        >
          <Loader active inverted size="big" inline="centered">
            Cargando canjes
          </Loader>
        </Box>
      ) : (
        <TablaCanjes canjes={canjes} />
      )}
    </>
  );
}
