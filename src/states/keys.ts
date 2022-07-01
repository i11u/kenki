/**
 * Recoil state must be unique.
 * This file contains all keys used in the whole application.
 * */

export enum RecoilAtomKeys {
  BLOCKS = 'blocks',
  UNSETTLED_BLOCK = 'unsettled_block',
  CURRENT_BLOCK = 'current_block',
  USER = 'user',
}

export enum RecoilSelectorKeys {
  BLOCKS = 'blocks_all_blocks',
  BLOCK_BY_ID = 'blocks_block_by_id',
  CURRENT_BLOCK_CURRENT = 'current_block_current',
  UNSETTLED_BLOCKS = 'cursors_all_cursors',
  UNSETTLED_BLOCK_BY_ID = 'cursors_cursor_by_id',
  USER = 'user_user',
}
