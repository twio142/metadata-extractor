import {readFileSync} from "fs";
import {getAllExceptMd} from '../src/utils';
import type {file, folder} from "../src/interfaces";

function getAllFilesForTEST() {
    const allFilesString = readFileSync('tests/methods.test.json', {encoding: 'utf-8'});
    const allFiles = JSON.parse(allFilesString);
    const folders: folder[] = [];
    const files: file[] = [];
    for (const element of allFiles ){
        if (element.children){
            folders.push({name: element.name, relativePath: element.path});
        }
        else
        {
            files.push({
                name: element.name,
                basename: element.basename,
                relativePath: element.path,
            });
        }
    }
    return {folders, files};
}

test('that we can create a list of TFile and TFolder', () => {
    const {folders, files} = getAllFilesForTEST();
    const result = getAllExceptMd(folders, files);
    expect(result).toMatchSnapshot();
});
