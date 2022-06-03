import * as fs from 'fs';
import { parse } from 'csv-parse/sync';
import { stringify } from 'csv-stringify/sync';
import uts46 from 'idna-uts46-hx'
import { ethers } from 'ethers';

// ENS normalization
function normalize(name) {
    return name ? uts46.toUnicode(name, {useStd3ASCII: true}) : name
}

// convert normalized label to token ID
function getTokenId(name) {
    const labelHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(name))
    return ethers.BigNumber.from(labelHash).toString()
}

// load ens collections
const json = JSON.parse(fs.readFileSync('ens-collections.json'));
const csv_file_errors = [];
const logo_file_errors = [];
for (const collection of json.collections) {
    let slug = collection.slug,
        abbrev = collection.abbreviation,
        intended_logo_file = slug + '.png',
        logo_file = collection.logo,
        intended_csv_file = slug + '.csv',
        csv_file = collection.csv[0];


    // check csv file name
    if (csv_file !== intended_csv_file) {
        csv_file_errors.push([slug, intended_csv_file, csv_file]);
    }

    // check logo file name
    if (logo_file !== intended_logo_file) {
        logo_file_errors.push([slug, intended_logo_file, logo_file]);
    }
}

// get intended action from first argument
const actions = ['verify'];
let action = 'verify';
if (process.argv[2] !== undefined && actions.includes(process.argv[2])) {
    action = process.argv[2];
}

console.log(['csv_file_errors', csv_file_errors]);
console.log(['logo_file_errors', logo_file_errors]);
