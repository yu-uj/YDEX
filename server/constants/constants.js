module.exports = class Defs {
    // DB
    static URL_DB = 'mongodb+srv://jongdae94:rlarnltjs1@cluster0.vtr5yee.mongodb.net/?retryWrites=true&w=majority'

    static NAME_DB_ACCOUNT = 'Account'
    static DEFINITION_DB_ACCOUNT = {
        id: { type: Number, maxlength: 100000, unique: 1 },
        account_address: { type: String, maxlength: 50, unique: 1 },
        klay_amount: { type: String, maxlength: 50 },
        token_amount: { type: String, maxlength: 50 }
    }

}