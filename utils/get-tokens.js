import * as fs from 'fs';
import { parse } from 'csv-parse/sync';
import { stringify } from 'csv-stringify/sync';
import uts46 from 'idna-uts46-hx'
import { ethers } from "ethers";

// ENS normalization
function normalize(name) {
    return name ? uts46.toUnicode(name, {useStd3ASCII: true}) : name
}

// convert normalized label to token ID
function getTokenId(name) {
    const labelHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(name))
    return ethers.BigNumber.from(labelHash).toString()
}

// get CSV file from first argument
if (process.argv[2] === undefined) {
    console.error("Error: No CSV file specified!");
    process.exit();
}
const csvFile = process.argv[2];

// get outfile if specified or use example-out.csv
let csvOutFile = csvFile.replace(new RegExp('\.csv$', 'i'), '-out.csv')
if (process.argv[3] !== undefined) {
    csvOutFile = process.argv[3];
}

// read csv file
const csvFS = fs.readFileSync(csvFile);

// csv parser
const parser_options = {
    delimiter: ',',
    skip_empty_lines: true
};

// parse csv file
const rows = parse(csvFS, parser_options);

// build array of normalized names from csv data
const names = [];
let row_num = 0;
for (const row of rows) {
    let name = row[0],
        normalized = normalize(name.endsWith('.eth') ? name.replace(new RegExp('\.eth$'), '') : name),
        tokenId = (row.length >= 2 && row[1] !== "" && row[1] !== null ? row[1] : getTokenId(normalized));
    // skip first row if column headers
    if (name === 'name' && row_num === 0) {
        continue;
    }
    names.push([normalized, tokenId]);
    row_num++;
}

console.log('Read ' + names.length + ' names from CSV file: ' + csvFile);
// console.log(names);

console.log('Outputting to CSV file: ' + csvOutFile);
const output = stringify(names, {
    header: false
});
fs.writeFileSync(csvOutFile, output);
