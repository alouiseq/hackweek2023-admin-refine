import { useState } from "react";
import { useModal } from "@refinedev/core";
import { Button, Modal, Space, theme } from "antd";
import { RefineThemes } from "@refinedev/antd";

export const ThemeSettings = ({ currentTheme, onThemeClick }) => {
  const [mode, setMode] = useState("dark");
  const { show, close, visible } = useModal();

  const onTokenColorClick = (token) => {
    onThemeClick({
      ...currentTheme,
      token,
    });

    close();
  };

  const toggleMode = () => {
    onThemeClick({
      ...currentTheme,
      algorithm: mode === "dark" ? theme.defaultAlgorithm : theme.darkAlgorithm,
    });
    setMode((prev) => (prev === "dark" ? "light" : "dark"));

    close();
  };

  return (
    <>
      <div
        style={{
          position: "absolute",
          bottom: "16px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <Button type="primary" onClick={show}>
          Theme Settings
        </Button>
      </div>
      <Modal
        open={visible}
        onCancel={close}
        destroyOnClose
        title="Theme Settings"
        footer={null}
      >
        <Space direction="vertical" size="large">
          <Space
            style={{
              flexWrap: "wrap",
            }}
          >
            {Object.keys(RefineThemes).map((name) => {
              const theme = RefineThemes[name];

              return (
                <Button
                  key={theme.token?.colorPrimary}
                  onClick={() => {
                    onTokenColorClick(theme.token);
                  }}
                  style={{
                    background: theme.token?.colorPrimary,
                  }}
                >
                  {name}
                </Button>
              );
            })}
          </Space>

          <Button type="dashed" onClick={toggleMode}>
            Set Mode to {mode === "dark" ? "Light ☀️" : "Dark  🌑"}
          </Button>
        </Space>
      </Modal>
    </>
  );
};

export default ThemeSettings;
