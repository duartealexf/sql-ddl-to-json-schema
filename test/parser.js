const ava = require('ava');
const Parser = require('../lib');

const tests = {
  'Should test quoting': {
    queries: [
      `
      create table \`\`\`te\`\`st\` (
        test BOOL DEFAULT "",
        test BOOL DEFAULT "a test",
        test BOOL DEFAULT "a "" test",
        test BOOL DEFAULT "a \\" test",
        test BOOL DEFAULT '',
        test BOOL DEFAULT 'a test',
        test BOOL DEFAULT 'a '' test',
        test BOOL DEFAULT 'a \\' test'
      );
      `,
    ],
    expect: {
      id: "MAIN",
      def: [
        {
          id: "P_DDS",
          def: {
            id: "P_CREATE_TABLE",
            def: {
              id: "P_CREATE_TABLE_COMMON",
              def: {
                table: "`te`st",
                columnsDef: {
                  id: "P_CREATE_TABLE_CREATE_DEFINITIONS",
                  def: [
                    {
                      id: "O_CREATE_TABLE_CREATE_DEFINITION",
                      def: {
                        column: {
                          name: "test",
                          def: {
                            datatype: {
                              id: "O_DATATYPE",
                              def: {
                                id: "O_BOOLEAN_DATATYPE",
                                def: {
                                  datatype: "BOOL"
                                }
                              }
                            },
                            columnDefinition: [
                              {
                                id: "O_COLUMN_DEFINITION",
                                def: {
                                  default: ""
                                }
                              }
                            ]
                          }
                        }
                      }
                    },
                    {
                      id: "O_CREATE_TABLE_CREATE_DEFINITION",
                      def: {
                        column: {
                          name: "test",
                          def: {
                            datatype: {
                              id: "O_DATATYPE",
                              def: {
                                id: "O_BOOLEAN_DATATYPE",
                                def: {
                                  datatype: "BOOL"
                                }
                              }
                            },
                            columnDefinition: [
                              {
                                id: "O_COLUMN_DEFINITION",
                                def: {
                                  default: "a test"
                                }
                              }
                            ]
                          }
                        }
                      }
                    },
                    {
                      id: "O_CREATE_TABLE_CREATE_DEFINITION",
                      def: {
                        column: {
                          name: "test",
                          def: {
                            datatype: {
                              id: "O_DATATYPE",
                              def: {
                                id: "O_BOOLEAN_DATATYPE",
                                def: {
                                  datatype: "BOOL"
                                }
                              }
                            },
                            columnDefinition: [
                              {
                                id: "O_COLUMN_DEFINITION",
                                def: {
                                  default: 'a " test'
                                }
                              }
                            ]
                          }
                        }
                      }
                    },
                    {
                      id: "O_CREATE_TABLE_CREATE_DEFINITION",
                      def: {
                        column: {
                          name: "test",
                          def: {
                            datatype: {
                              id: "O_DATATYPE",
                              def: {
                                id: "O_BOOLEAN_DATATYPE",
                                def: {
                                  datatype: "BOOL"
                                }
                              }
                            },
                            columnDefinition: [
                              {
                                id: "O_COLUMN_DEFINITION",
                                def: {
                                  default: 'a " test'
                                }
                              }
                            ]
                          }
                        }
                      }
                    },
                    {
                      id: "O_CREATE_TABLE_CREATE_DEFINITION",
                      def: {
                        column: {
                          name: "test",
                          def: {
                            datatype: {
                              id: "O_DATATYPE",
                              def: {
                                id: "O_BOOLEAN_DATATYPE",
                                def: {
                                  datatype: "BOOL"
                                }
                              }
                            },
                            columnDefinition: [
                              {
                                id: "O_COLUMN_DEFINITION",
                                def: {
                                  default: ""
                                }
                              }
                            ]
                          }
                        }
                      }
                    },
                    {
                      id: "O_CREATE_TABLE_CREATE_DEFINITION",
                      def: {
                        column: {
                          name: "test",
                          def: {
                            datatype: {
                              id: "O_DATATYPE",
                              def: {
                                id: "O_BOOLEAN_DATATYPE",
                                def: {
                                  datatype: "BOOL"
                                }
                              }
                            },
                            columnDefinition: [
                              {
                                id: "O_COLUMN_DEFINITION",
                                def: {
                                  default: "a test"
                                }
                              }
                            ]
                          }
                        }
                      }
                    },
                    {
                      id: "O_CREATE_TABLE_CREATE_DEFINITION",
                      def: {
                        column: {
                          name: "test",
                          def: {
                            datatype: {
                              id: "O_DATATYPE",
                              def: {
                                id: "O_BOOLEAN_DATATYPE",
                                def: {
                                  datatype: "BOOL"
                                }
                              }
                            },
                            columnDefinition: [
                              {
                                id: "O_COLUMN_DEFINITION",
                                def: {
                                  default: "a ' test"
                                }
                              }
                            ]
                          }
                        }
                      }
                    },
                    {
                      id: "O_CREATE_TABLE_CREATE_DEFINITION",
                      def: {
                        column: {
                          name: "test",
                          def: {
                            datatype: {
                              id: "O_DATATYPE",
                              def: {
                                id: "O_BOOLEAN_DATATYPE",
                                def: {
                                  datatype: "BOOL"
                                }
                              }
                            },
                            columnDefinition: [
                              {
                                id: "O_COLUMN_DEFINITION",
                                def: {
                                  default: "a ' test"
                                }
                              }
                            ]
                          }
                        }
                      }
                    }
                  ]
                },
                tableOptions: null
              }
            }
          }
        }
      ]
    }
  }
};

Object.getOwnPropertyNames(tests).forEach(description => {
  const test = tests[description];

  test.queries.forEach(query => {

    const testname = `${description} | ${query}`;

    const parser = new Parser();
    parser.feed(query);

    ava(testname, t => {
      const value = parser.results;
      t.deepEqual(value, test.expect);
    });
  });
});
