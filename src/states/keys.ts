/**
 * Recoil state must be unique.
 * This file contains all keys used in the whole application.
 * */

export enum RecoilAtomKeys {
  BLOCKS = 'blocks',
  CURRENT_BLOCK = 'current_block',
  USER = 'user',
  INPUT = 'input',
  EDITOR = 'editor',
  PAGE = 'page',
}

export enum RecoilSelectorKeys {
  BLOCKS = 'blocks_all_blocks',
  BLOCK_BY_ID = 'blocks_block_by_id',
  SELECTED_BLOCKS = 'selected_blocks',
  EDITING_BLOCK = 'editing_block',
  EDITING_BLOCK_ID = 'editing_block_id',
  NEXT_BLOCK = 'next_block',
  CURRENT_BLOCK_CURRENT = 'current_block_current',
  USER = 'user_user',
  INPUT = 'input_input',
  EDITOR_CONFIG = 'editor_config',
  SIDEBAR_CONFIG = 'sidebar_config',
  SIDEBAR_DISPLAY = 'sidebar_display',
  PAGE_CONFIG = 'page_config',
  PAGE_GRID_NUM = 'page_grid_num',
  PAGE_ASPECT_RATIO = 'page_aspect_ratio',
  PAGE_SCALE = 'page_scale',
}
