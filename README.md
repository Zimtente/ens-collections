
# ENS Collections

ENS Collections are categories of ENS names based on specific patterns or predefined lists. This repository is an effort towards bringing all collections together into one place and standardizing their definition in order to facilitate consistent integrations across platforms and marketplaces.

This repo is maintained by: @zimtente ([ENS.Vision](https://ens.vision)) and @paste ([ENS.Tools](https://ens.tools))


### Metadata
The metadata for all collections is in `ens-collections.json`.

- **name: collection name**
- **slug: short, lowercase, url-friendly abbreviation (use hyphens instead of spaces)**
- **description: one sentence description**
- twitter: twitter username
- website: full website url
- chat: link for group chat, e.g. discord/telegram
- logo: logo file, use slug for filename, e.g. "three-letters.png"
- **csv: array of csv files, use slug for filename, e.g. ["three-letters.csv"]**

<sub>**bold** = required field.</sub>


### CSV files
The .csv should include all names in the collection in ascending alphanumeric order. There are two columns: name and token ID. The names should not include the .eth extension and should be normalized using [standard ENS normalization](https://docs.ens.domains/contract-api-reference/name-processing#normalising-names). The token ID can be omitted for collections who have not yet fully been registered. New collections can be submitted without token IDs -- we can populate them if necessary.

```
name,token
vitalik,79233663829379634837589865448569342784712482819484549289560981379859480642508
ens,42033647921836720708986079437023664695436352815832009766988496528855301124570
0001,38764329101403256878217503524140705778209985981144907919668889447405219871633
```

- [ ] TODO: add script to populate token IDs in CSV from TheGraph.

 
&nbsp;
&nbsp;
  

# Contributing

Please create issues or pull requests to contribute to this repo.

### Proposing a New Collection
Here is a quick checklist when submitting a new collection:

- The collection must be significantly different from any existing collection. 
- Provide all the required metadata fields (see above).
- CSVs should be properly formatted and use the slug for filename. New collections can be submitted without token IDs.
- (Optional) Logo files should be square dimensions that work with a circular crop (like Twitter). Logo files should be at least 500x500px, and no more than 1200x1200px. Logo files should use the slug for filename.


### Example Collection Proposal:
**Metadata content:**
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

**.CSV content:**
```
name,token
0000,105307555225596823162770746791279321249474694422393704130067750948958748271609
0001,38764329101403256878217503524140705778209985981144907919668889447405219871633
0002,37929174533718175565910670676525701091954781139941253617179119590462796771323
...
```

### Adding or Removing Names from a Collection

To modify an existing collection, please create an issue or pull request and provide:

- Explanation why the item should be added/removed from a collection
- Collection Name
- Name of the item
- (Optional) Token ID of the item

 
 
### Additional Information

- How to convert a name into a token ID: https://docs.ens.domains/dapp-developer-guide/ens-as-nft
