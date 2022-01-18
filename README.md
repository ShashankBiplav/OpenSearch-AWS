## Running locally

1. Clone the repository and install the dependencies::

   yarn install

2. Copy .env.example, rename to .env and there the service_uri of your OpenSearch cluster.

3. Download full_format_recipes from Kaggle `https://www.kaggle.com/hugodarwood/epirecipes?select=full_format_recipes.json`.

## Endpoints Documentation

https://documenter.getpostman.com/view/11888806/UVXnFtWs

> **Note:** For more **endpoints** see src>routes>index.ts.

## Project Structure

```
- root
  |
  |**\_**package.json
  |**\_**.env
  |**\_**.env-sample
  |**\_**.gitignore
  |**\_**tsconfig.json
  |**\_**src
  |**\_**|
  |**\_**|**\_\_\_**app.ts
  |**\_**|**\_\_\_**config.ts
  |**\_**|**\_\_\_**controllers
  |**\_**|**\_\_\_**helpers
  |**\_**|**\_\_\_**routes
  |**\_**|**\_\_\_**services
```
