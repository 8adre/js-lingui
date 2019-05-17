export default [
  {
    name: "should expand macros",
    input: `
        import { defineMessages, plural, arg } from '@lingui/macro';
        const messages = defineMessages({
          string: "Hello World",
          hello: t\`Hello World\`,
          plural: plural(arg("value"), { one: "book", other: "books" })
        })
    `,
    expected: `
        const messages = {
          string:
            /*i18n*/
            "Hello World",
          hello: 
            /*i18n*/
            "Hello World",
          plural:
            /*i18n*/
            "{value, plural, one {book} other {books}}",
        }
    `
  },
  {
    name: "should expand macros inside descriptor",
    input: `
        import { defineMessages, arg } from '@lingui/macro';
        const messages = defineMessages({
          plural: {
            id: "msg.id",
            comment: "Description",
            message: plural(arg("value"), { one: "book", other: "books" })
          }
        })
    `,
    expected: `
        const messages = {
          plural: 
            /*i18n*/
            {
              id: "msg.id",
              comment: "Description",
              message: "{value, plural, one {book} other {books}}"
            }
        }
    `
  }
]
