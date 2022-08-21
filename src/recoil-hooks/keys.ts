/**
 * Recoil state must be unique.
 * This file contains all keys used in the whole application.
 * */

export enum RecoilAtomKeys {
  BLOCK = 'block',
  BLOCKS = 'blocks',
  INPUT = 'input',
  EDITOR = 'editor',
  PAGE = 'page',
  MODE = 'mode',
}

export enum RecoilSelectorKeys {
  BLOCKS = 'blocks_all_blocks',
  BLOCK_BY_ID = 'blocks_block_by_id',
  SELECTED_BLOCKS = 'selected_blocks',
  EDITING_BLOCK = 'editing_block',
  EDITING_BLOCK_ID = 'editing_block_id',
  NEXT_BLOCK = 'next_block',
  EDITOR_CONFIG = 'editor_config',
  SIDEBAR_CONFIG = 'sidebar_config',
  SIDEBAR_ISOPEN = 'sidebar_is_open',
  PAGE_CONFIG = 'page_config',
  PAGE_GRID_NUM = 'page_grid_num',
  PAGE_ASPECT_RATIO = 'page_aspect_ratio',
  PAGE_SCALE = 'page_scale',
  INPUT = 'input_input',
  MODE = 'mode_mode',
}
