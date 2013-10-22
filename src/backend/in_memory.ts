import indexed_filesystem = require('../generic/indexed_filesystem');
import file_index = require('../generic/file_index');
import file = require('../core/file');
import file_flag = require('../core/file_flag');
import node_fs_stats = require('../core/node_fs_stats');
import buffer = require('../core/buffer');
import preload_file = require('../generic/preload_file');
import util = require('../core/util');

var Buffer = buffer.Buffer;
var NoSyncFile = preload_file.NoSyncFile;
export class InMemory extends indexed_filesystem.IndexedFileSystem {
  constructor() {
    super(new file_index.FileIndex());
  }

  public empty(): void {
    this._index = new file_index.FileIndex();
  }

  public getName(): string {
    return 'In-memory';
  }

  public static isAvailable(): boolean {
    return true;
  }

  public diskSpace(path: string, cb: (total: number, free: number) => void): void {
    return cb(Infinity, util.roughSizeOfObject(this._index));
  }

  public isReadOnly(): boolean {
    return false;
  }

  public supportsLinks(): boolean {
    return false;
  }

  public supportsProps(): boolean {
    return false;
  }

  public _truncate(path: string, flags: file_flag.FileFlag, inode: node_fs_stats.Stats): file.File {
    inode.size = 0;
    inode.mtime = new Date();
    var file = <preload_file.NoSyncFile> inode.file_data;
    file._flag = flags;
    file._buffer = new Buffer(0);
    return file;
  }

  public _fetch(path: string, flags: file_flag.FileFlag, inode: node_fs_stats.Stats): file.File {
    var file = <preload_file.NoSyncFile> inode.file_data;
    file._flag = flags;
    return file;
  }

  public _create(path: string, flags: file_flag.FileFlag, inode: node_fs_stats.Stats): file.File {
    var file = new NoSyncFile(this, path, flags, inode);
    inode.file_data = file;
    this._index.addPath(path, inode);
    return file;
  }

  public _rmdirSync(path: string, inode: file_index.Inode): void {}
}
