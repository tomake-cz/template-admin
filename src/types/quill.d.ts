declare global {
  type ToolbarLiteral =
    | 'background'
    | 'bold'
    | 'color'
    | 'font'
    | 'code'
    | 'italic'
    | 'link'
    | 'size'
    | 'strike'
    | 'script'
    | 'underline'
    | 'blockquote'
    | 'header'
    | 'indent'
    | 'list'
    | 'align'
    | 'direction'
    | 'code-block'
    | 'formula'
    | 'image'
    | 'video';

  type ToolbarDropdown = { [key in ToolbarLiteral]?: string[] };
  type ToolbarOptions = (ToolbarLiteral | ToolbarDropdown)[];

  type ToolbarPreset = 'title';

  type Toolbar = 'full' | 'essential' | 'minimal' | ToolbarOptions;
  type ExtendedToolbar = Toolbar | ToolbarPreset;
}

export {};
