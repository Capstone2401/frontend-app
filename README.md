# DataLoaf Dashboard

This dashboard, built using React, provides a comprehensive platform for real-time user and event insights. Below, you'll find an overview of its functionalities and how to effectively utilize them.

<details>
  <summary><strong>⚠️Warning: Running Locally</strong></summary>
  <div>

  Please note that running this dashboard locally is not recommended, as it is designed to work with the DataLoaf backend running on specific AWS infrastructure. To provision DataLoaf and utilize this dashboard effectively, please refer to the documentation at: [DataLoaf CLI](https://github.com/data-loaf/CLI)

  </div>
</details>


## Query Creation

Queries form the cornerstone of data exploration in the DataLoaf Dashboard. Each query is defined by the following parameters:

1. **Event Type**: Specify the type of event you wish to analyze.
2. **Aggregation Type**: Define how you want the data to be aggregated, such as sum, count, average, etc.
3. **Filter Selections** (Optional): Apply specific filters to narrow down the scope of your analysis.
4. **Time Frame**: Determine the time period for which you want to fetch data.

The term **metric** is often used to encompass a similar set of parameters in product analytics, excluding filters.

![Query Creation](https://data-loaf.com/assets/images/dataloaf-dashboard-final-897052c91bd212697fb0c847442f1c8e.png)

## Additional Features

The DataLoaf Dashboard is equipped with several features to facilitate the creation of insightful queries:

1. **Visualization Selections**: Choose from a variety of visualization types to represent your data effectively, including line, area, and bar charts.

2. **Interactive Data Points**: Hover over data points to view detailed information via floating tooltips, enhancing data exploration and analysis.

3. **Multi-Query Analysis**: Compare multiple queries simultaneously by adding them to the query builder. This functionality is particularly useful for comparing different aggregations, event types, filters, or their combinations.

![Additional Features](https://data-loaf.com/assets/images/dataloaf-dashboard-features-final-361406cc0ea653a82983af5d9c6471d4.png)

## Other resources
If you want to read more about DataLoaf, [visit this site](https://data-loaf.com)
