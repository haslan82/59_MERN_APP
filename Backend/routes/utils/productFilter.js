const { query } = require("express");

class ProductFilter {
    constructor( query,queryStr) {
        this.query = query;
        this.queryStr = queryStr
    }

    search() {
       const keyword = this.queryStr.keyword?{
        $regex:this.queryStr.keyword,
        $options:"i"
       }:{}
       this.query = this.query.find({...keyword})
       return this;
    }
    filter(){}
    pagination(){}



}

module.exports = ProductFilter