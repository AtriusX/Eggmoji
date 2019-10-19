# Eggmoji
Generate random egg emojis

# The Process
The system starts off by generating an egg based of a base rule. These rules are either solid or gradient fills.
Following this, template pieces are chosen to be placed over the egg, each piece colored differently in a way
that compliments the base colors. 

1. Generate base egg (solid or gradient)
2. Generate complimentary designs (if any)
3. Generate accents (if any)
4. Generate paint texture overlay (if any)
5. Cut out excess and add shadow
6. Post processing(?)

Data used for procedural generation is stored in the templates directory.

This data includes both the image files used as the templates, and a JSON metadata file which describes the ways
a source image can be manipulated. (This includes a link to the source file, images are not to be referenced directly
outside of the JSON file.) The following properties are used:

- Image source -- Image file link
- Max rotation -- The max number of degrees a template can be rotated
- Flipping     -- Whether or not an image can be flipped horizontally, vertically, both, or neither
- Stretching   -- Whether or not an image can be stretched horizontally, vertically, both or neither
- Words        -- Words related to the template (can be used to build phrases to pass along with the egg)
- 