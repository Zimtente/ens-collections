
# ENS Collections

ENS Collections are categories of ENS names based on specific patterns or predefined lists. This repository is an effort towards bringing all collections together into one place and standardizing their definition in order to facilitate integrations across platforms and marketplaces.


### Metadata
The metadata for all collections is in `ens-collections.json`.

- **name**: collection name
- **slug**: short, url-friendly abbreviation
- **description**: one sentence description
- twitter: twitter username
- website: full website url
- chat: chat url, e.g. discord/telegram
- logo: logo file, use slug for filename, e.g. "three-letters.png"
- **csv**: array of csv files, use slug for filename, e.g. ["three-letters.csv"]

<sub>**bold** = required field.</sub>


### CSV files
The .csv files in `/csvs` should include all names in the collection in ascending alphanumeric order. There are two columns: name and token ID. The names should not include the .eth extension and be normalized using [standard ENS normalization](https://docs.ens.domains/contract-api-reference/name-processing#normalising-names). The token ID can be omitted for collections who have not yet fully been registered. New collections can be submitted without token IDs -- we can populate them if necessary.
TODO: add script to populate token IDs in CSV from TheGraph.
```
name,token
vitalik,79233663829379634837589865448569342784712482819484549289560981379859480642508
ens,42033647921836720708986079437023664695436352815832009766988496528855301124570
0001,38764329101403256878217503524140705778209985981144907919668889447405219871633
```


### Contributing a New Collection
Here is a general checklist when submitting a new collection:

- The collection must be significantly different from any existing collection. 
- Provide all the required metadata fields (see above), and any additional fields if they exist.
- CSV files should follow file naming standards and be properly formatted (see above). New collections can be submitted without token IDs.
- (Optional) Logo file should follow file naming standards, with square dimensions that work within a circular crop. Logo files should be at least 500x500px, and no more than 1200x1200px. 


**Example Collection Proposal:**
1) Metadata content:
```
{
  "name": "10k Club",
  "slug": "10k-club"
  "description": "Names with 4 digits, 0000-9999.",
  "twitter": "@10kClubOfficial",
  "website": "https://10kClub.com",
  "chat": "https://discord.gg/aUemBKUuZ5",
  "logo": "10k-club.png",
  "csv": ["10k-club.csv"]
}
```
2) .CSV content:
```
name,token
0000,105307555225596823162770746791279321249474694422393704130067750948958748271609
0001,38764329101403256878217503524140705778209985981144907919668889447405219871633
0002,37929174533718175565910670676525701091954781139941253617179119590462796771323
```

**Adding/Removing Names from a Collection**
To modify an existing collection: 
- Collection Name
- Name of the item
- Token ID of the item
- Explanation why the item should be added/removed from a collection

**Remove an existing item from a category**
* Name of the item
* TokenId of the item
* Category the item should be removed from
* Explanation why the item should be removed from a category

### Additional Information
* How to convert a name into a token ID: https://docs.ens.domains/dapp-developer-guide/ens-as-nft
