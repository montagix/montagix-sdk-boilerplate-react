import { useEffect, useRef } from "react";
import { useEngineStoreContext } from "../contexts/EngineStoreContext";
import { observer } from "mobx-react-lite";
import {
  FadeInTransition,
  FadeOutTransition,
  SepiaFilter,
  TwirlEffect,
} from "@montagix/engine";

const EditorContainer = observer(() => {
  const engineStore = useEngineStoreContext();
  const engine = engineStore.getEngine();
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (containerRef.current != null) {
      engine.append(containerRef.current);
    }
  }, [containerRef.current]);

  useEffect(() => {
    if (!engine.isInitializing) {
      init();
    }
  }, [engine.isInitializing]);

  async function init() {
    const layer = engine.sceneGraph.createLayer();

    await engine
      .image(
        "https://images.unsplash.com/photo-1695829078492-6c88a9d1aa36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=100"
      )
      .then((node) => {
        node.startAt = 0;
        node.duration = 1000;

        node.addFilter(new TwirlEffect());

        engine.sceneGraph.addClip(node, layer.id);
      });

    await engine.video("/videos/bbb_video_avc_frag.mp4").then((node) => {
      node.startAt = 100;

      node.addTransitionIn(new FadeInTransition({ duration: 30 }));
      node.addTransitionOut(new FadeOutTransition({ duration: 30 }));

      node.addFilter(new SepiaFilter());

      engine.sceneGraph.addClip(node, layer.id);
    });

    await engine.text("Hello World").then((node) => {
      node.startAt = 0;
      node.duration = 100;
      node.style.fontSize = 64;
      node.style.x = 0;
      node.style.y = 0;
      node.style.color = "red";

      engine.sceneGraph.addClip(node, layer.id);
    });
  }

  function handleTogglePlay() {
    if (engine.isPlaying) {
      engine.pause();
    } else {
      engine.play();
    }
  }

  function handleRender() {
    engine
      .render()
      .then((res) => {
        console.log({ res });
      })
      .catch((error) => {
        alert(JSON.stringify(error));
      });
  }

  return (
    <div id="container" ref={containerRef}>
      <div className="tools">
        <button onClick={handleTogglePlay}>
          {engine.isPlaying ? "Pause" : "Play"}
        </button>

        <button onClick={handleRender}>Render</button>
      </div>
    </div>
  );
});

export default EditorContainer;
