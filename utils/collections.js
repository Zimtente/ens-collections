import * as fs from 'fs';
import { parse } from 'csv-parse/sync';
import { stringify } from 'csv-stringify/sync';
import uts46 from 'idna-uts46-hx'
import { ethers } from 'ethers';
import core from '@actions/core';


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
const csvs_path = './collections/';
const logos_path = './logos/';
for (const collection of json.collections) {
    let slug = collection.slug,
        intended_logo_file = slug + '.png',
        logo_file = collection.logo,
        intended_csv_file = slug + '.csv',
        csv_file = collection.csv[0];


    // check csv file name
    if (csv_file !== intended_csv_file) {
        csv_file_errors.push([intended_csv_file, csv_file, "CSV FILE DOES NOT MATCH CLUB SLUG"]);
    } else if (!fs.existsSync(csvs_path + csv_file)) {
        csv_file_errors.push([intended_csv_file, csv_file, "CSV FILE DOES NOT EXIST: " + csvs_path + csv_file]);
    }

    // check logo file name
    if (logo_file !== intended_logo_file && logo_file !== "") {
        // rename old logo to intended file name
        logo_file_errors.push([intended_logo_file, logo_file]);
        // if (fs.existsSync(logos_path + logo_file)) {
        //     console.log("was gonna rename:", logo_file, intended_logo_file);
            // fs.renameSync(logos_path + logo_file, logos_path + intended_logo_file);
        // }
    } else if (!fs.existsSync(logos_path + logo_file)) {
        logo_file_errors.push([intended_logo_file, logo_file, "LOGO FILE DOES NOT EXIST: " + logos_path + logo_file]);
    }
}

// get intended action from first argument
const actions = ['verify'];
let action = 'verify';
if (process.argv[2] !== undefined && actions.includes(process.argv[2])) {
    action = process.argv[2];
}

core.info(`csv_file_errors: \n ${csv_file_errors.join('\r\n')}`);
core.info(`logo_file_errors: \n ${logo_file_errors.join('\r\n')}`);

if (csv_file_errors.length > 0 || logo_file_errors.length > 0) {
  core.setFailed("Verify collections failed");
}