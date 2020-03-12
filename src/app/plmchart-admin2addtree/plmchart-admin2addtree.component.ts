import { HttpClient } from '@angular/common/http';
import {NestedTreeControl} from '@angular/cdk/tree';
import {Component, Injectable} from '@angular/core';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {BehaviorSubject} from 'rxjs';
import { PLM_SPRING_URL } from '../app.properties';

/**
 * Json node data with nested structure. Each node has a filename and a value or a list of children
 */
export class FileNode {
  children: FileNode[];
  filename: string;
  type: any;
}

/**
 * The Json tree data in string. The data could be parsed into Json object
 */


/**
 * File database, it can build a tree structured Json object from string.
 * Each node in Json object represents a file or a directory. For a file, it has filename and type.
 * For a directory, it has filename and children (a list of files or directories).
 * The input will be a json object string, and the output is a list of `FileNode` with nested
 * structure.
 */
@Injectable()
export class FileDatabase {
  dataChange = new BehaviorSubject<FileNode[]>([]);
  get data(): FileNode[] { return this.dataChange.value; }

  constructor(private http: HttpClient) {
    this.initialize();
  }

  async initialize() {
    let TREE_DATA ;
    await this.http.get(PLM_SPRING_URL + '/newApi/CheckTask/setUserIntree').toPromise().then(async (data: any) => {
      TREE_DATA = JSON.stringify(data);
      console.log(TREE_DATA);
      }, err => console.log('ERROR on setDataUserToService'));

      // Parse the string to json object.
      let dataObject = JSON.parse(TREE_DATA);

      // Build the tree nodes from Json object. The result is a list of `FileNode` with nested
      //     file node as children.
      let data = this.buildFileTree(dataObject, 0);

      // Notify the change.
      this.dataChange.next(data);
  }

  /**
   * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
   * The return value is the list of `FileNode`.
   */

  buildFileTree(obj: {[key: string]: any}, level: number): FileNode[] {
    return Object.keys(obj).reduce<FileNode[]>((accumulator, key) => {
      let value = obj[key];
      let node = new FileNode();
      node.filename = key;

      if (value != null) {
        if (typeof value === 'object') {
          node.children = this.buildFileTree(value, level + 1);
        } else {
          node.type = value;
        }
      }

      return accumulator.concat(node);
    }, []);
  }
}

/**
 * @title Tree with nested nodes
 */

@Component({
  selector: 'app-plmchart-admin2addtree',
  templateUrl: './plmchart-admin2addtree.component.html',
  styleUrls: ['./plmchart-admin2addtree.component.css'],
  providers: [FileDatabase]
})
export class PlmchartAdmin2addtreeComponent {
  nestedTreeControl: NestedTreeControl<FileNode>;
  nestedDataSource: MatTreeNestedDataSource<FileNode>;

  constructor(database: FileDatabase) {
    this.nestedTreeControl = new NestedTreeControl<FileNode>(this._getChildren);
    this.nestedDataSource = new MatTreeNestedDataSource();

    database.dataChange.subscribe(data => this.nestedDataSource.data = data);
  }

  hasNestedChild = (_: number, nodeData: FileNode) => !nodeData.type;

  private _getChildren = (node: FileNode) => node.children;
  
}