import * as React from 'react';
import GjsEditor, {
  AssetsProvider,
  Canvas,
  WithEditor,
  ModalProvider,
} from '@grapesjs/react';
import type { Editor, EditorConfig } from 'grapesjs';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { MAIN_BORDER_COLOR } from './components/common';
import CustomModal from './components/CustomModal';
import CustomAssetManager from './components/CustomAssetManager';
import Topbar from './components/Topbar';
import RightSidebar from './components/RightSidebar';
import './style.css';
import { BlockCategory, WIDGET_BLOCK } from './core/Blocks.const';
import LoadOverrides from './components/Overrides';
import LeftSidebar from './components/LeftSidebar';
import Template from "./Template";

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const gjsOptions: EditorConfig = {
  height: '100vh',
  storageManager: false,
  undoManager: { trackSelection: false },
  selectorManager: { componentFirst: true },
  blockManager: {
    custom: true,
    blocks: [
      ...WIDGET_BLOCK.map((wid) => {
        return {
          ...wid,
          category: BlockCategory.WidgetBlock,
        };
      }),
    ],
  },
  canvas: {
    scripts: ['https://cdn.tailwindcss.com'],
    styles: ['./style.css'],
  },
  style: 'body{background-color:#000000;}',
  projectData: {
    assets: [
      'https://via.placeholder.com/350x250/78c5d6/fff',
      'https://via.placeholder.com/350x250/459ba8/fff',
      'https://via.placeholder.com/350x250/79c267/fff',
      'https://via.placeholder.com/350x250/c5d647/fff',
      'https://via.placeholder.com/350x250/f28c33/fff',
    ],
    content: '<h1>GrapesJS React Custom UI</h1>',
    pages: [
      {
        name: 'Home page',
        component: `<h1>GrapesJS React Custom UI</h1>`,
      },
    ],
  },
};

export default function App() {
  const onEditor = (editor: Editor) => {
    console.log('Editor loaded');
    (window as any).editor = editor;

    editor.setStyle('body { background-color: blue}');
  };

  return (
    // @ts-ignore
    <ThemeProvider theme={theme}>
      <GjsEditor
        className="gjs-custom-editor text-white bg-[#454545]"
        grapesjs="https://unpkg.com/grapesjs"
        grapesjsCss="https://unpkg.com/grapesjs/dist/css/grapes.min.css"
        options={gjsOptions}
        plugins={[
          {
            id: 'gjs-blocks-basic',
            src: 'https://unpkg.com/grapesjs-blocks-basic',
          },
          {
            id: 'grapesjs-rulers',
            src: 'https://unpkg.com/grapesjs-rulers',
          },
          LoadOverrides,
        ]}
        onEditor={onEditor}
      >
        <Topbar className="min-h-[48px] bg-[#555]" />

        <div className={`flex h-full border-t ${MAIN_BORDER_COLOR}`}>
          <LeftSidebar
            className={`gjs-column-r w-[300px] border-l ${MAIN_BORDER_COLOR}`}
          />
          <div className="gjs-column-m flex flex-col flex-grow">
          <WithEditor>
								<Template />
							</WithEditor>
            <Canvas className="flex-grow gjs-custom-editor-canvas" />
          </div>
          <RightSidebar
            className={`gjs-column-r w-[300px] border-l ${MAIN_BORDER_COLOR}`}
          />
        </div>
        <ModalProvider>
          {({ open, title, content, close }) => (
            <CustomModal
              open={open}
              title={title}
              children={content}
              close={close}
            />
          )}
        </ModalProvider>
        <AssetsProvider>
          {({ assets, select, close, Container }) => (
            <Container>
              <CustomAssetManager
                assets={assets}
                select={select}
                close={close}
              />
            </Container>
          )}
        </AssetsProvider>
      </GjsEditor>
    </ThemeProvider>
  );
}
