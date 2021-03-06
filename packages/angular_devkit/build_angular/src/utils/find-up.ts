/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { existsSync } from 'fs';
import * as path from 'path';
import { isDirectory } from './is-directory';

export function findAllNodeModules(from: string, root?: string): string[] {
  const nodeModules: string[] = [];

  let current = from;
  while (current && current !== root) {
    const potential = path.join(current, 'node_modules');
    if (existsSync(potential) && isDirectory(potential)) {
      nodeModules.push(potential);
    }

    const next = path.dirname(current);
    if (next === current) {
      break;
    }
    current = next;
  }

  return nodeModules;
}
