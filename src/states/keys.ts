/**
 * Recoil state must be unique.
 * This file contains all keys used in the whole application.
 * */

export enum RecoilAtomKeys {
  BLOCKS = 'blocks',
  UNSETTLED_BLOCK = 'unsettled_block',
  CURRENT_BLOCK = 'current_block',
  USER = 'user',
  CURSOR = 'cursor',
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
  UNSETTLED_BLOCKS = 'cursors_all_cursors',
  UNSETTLED_BLOCK_BY_ID = 'cursors_cursor_by_id',
  USER = 'user_user',
  CURSORS = 'cursors',
  CURSOR_BY_ID = 'cursor_by_id',
  INPUT = 'input_input',
  EDITOR_CONFIG = 'editor_config',
  PAGE_CONFIG = 'page_config',
}
