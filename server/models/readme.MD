# Mongoose model files

## Format
See for example user.ts

A model file should have the folowing components:

 - `export interface I<ModelName>`
    An interface for the pure model
 - `export interface I<ModelName>Model`
    An interface implementing both the pure model interface and mongoose.Document
 - `export const <ModelName>Schema`
    The mongoose Schema for the model
 - `export const <ModelName>`
    The mongoose model itself
