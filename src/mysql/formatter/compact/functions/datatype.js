/**
 * Formatter for O_DATATYPE rule's parsed JSON.
 * Simplifies datatype rule definitions.
 *
 * @param {any} datatype Rule's JSON definition.
 * @returns {any} Datatype definition.
 */
const O_DATATYPE = datatype => {
  const typeinfo = datatype.def.def;
  typeinfo.datatype = typeinfo.datatype.toLowerCase();

  return typeinfo;
};

module.exports = {
  O_DATATYPE
};
