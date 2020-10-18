// Modules are just barrels that export functions
// Exporting functions is the only thing needed for them to run on GCP

// To Deploy:
// firebase init (create firebase environment and link project)
// firebase use <project-name>
// firebase deploy --only functions

export * from './calculate-price.on-http';
export * from './calculate-price.on-update';
