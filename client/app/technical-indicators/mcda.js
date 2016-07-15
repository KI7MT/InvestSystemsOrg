"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var stock_price_1 = require('../charts/stock-price');
var MACDEntry = (function (_super) {
    __extends(MACDEntry, _super);
    function MACDEntry(date, price) {
        _super.call(this, date, price);
        this.priceSum = 0;
        this.macdSum = 0;
    }
    return MACDEntry;
}(stock_price_1.StockPrice));
exports.MACDEntry = MACDEntry;
var MACD = (function () {
    function MACD() {
        this.PARAM_1 = 12;
        this.PARAM_2 = 26;
        this.PARAM_3 = 9;
    }
    MACD.prototype.calculate = function (stockPrices) {
        var _this = this;
        var mcdaEntries = [];
        debugger;
        var entries = stockPrices.map(function (sp) { return new MACDEntry(sp.date, sp.price); });
        entries.reduce(function (previousValue, currentValue, currentIndex) {
            var index = currentIndex + 1;
            currentValue.priceSum = previousValue.priceSum + currentValue.price;
            currentValue.priceAverage = currentValue.priceSum / index;
            // 12 Day EMA
            if (index === _this.PARAM_1) {
                currentValue.ema12day = currentValue.priceAverage;
            }
            else if (index > _this.PARAM_1) {
                currentValue.ema12day = currentValue.price * (2 / (_this.PARAM_1 + 1)) + previousValue.ema12day * (1 - 2 / (_this.PARAM_1 + 1));
            }
            // 26 Day EMA
            if (index === _this.PARAM_2) {
                currentValue.ema26day = currentValue.priceAverage;
            }
            else if (index > _this.PARAM_2) {
                currentValue.ema26day = currentValue.price * (2 / (_this.PARAM_2 + 1)) + previousValue.ema26day * (1 - 2 / (_this.PARAM_2 + 1));
            }
            // MCDA
            if (index >= _this.PARAM_2) {
                currentValue.macd = currentValue.ema12day - currentValue.ema26day;
                currentValue.macdSum = previousValue.macdSum + currentValue.macd;
                currentValue.macdAverage = currentValue.macdSum / (index - _this.PARAM_2 + 1);
            }
            // Signal
            if (index === (_this.PARAM_2 + _this.PARAM_3 - 1)) {
                currentValue.signal = currentValue.macdAverage;
            }
            else if (index > (_this.PARAM_2 + _this.PARAM_3 - 1)) {
                currentValue.signal = currentValue.macd * (2 / (_this.PARAM_3 + 1)) + previousValue.signal * (1 - 2 / (_this.PARAM_3 + 1));
            }
            // Histogram
            if (index >= (_this.PARAM_2 + _this.PARAM_3 - 1)) {
                currentValue.histogram = currentValue.macd - currentValue.signal;
            }
            return currentValue;
        }, new MACDEntry(new Date(1900, 1, 1), 0));
        return entries;
    };
    return MACD;
}());
exports.MACD = MACD;
exports.MCDA_TEST_DATA = [
    new stock_price_1.StockPrice(new Date('2/19/2013'), 459.99),
    new stock_price_1.StockPrice(new Date('2/20/2013'), 448.85),
    new stock_price_1.StockPrice(new Date('2/21/2013'), 446.06),
    new stock_price_1.StockPrice(new Date('2/22/2013'), 450.81),
    new stock_price_1.StockPrice(new Date('2/25/2013'), 442.8),
    new stock_price_1.StockPrice(new Date('2/26/2013'), 448.97),
    new stock_price_1.StockPrice(new Date('2/27/2013'), 444.57),
    new stock_price_1.StockPrice(new Date('2/28/2013'), 441.4),
    new stock_price_1.StockPrice(new Date('3/1/2013'), 430.47),
    new stock_price_1.StockPrice(new Date('3/4/2013'), 420.05),
    new stock_price_1.StockPrice(new Date('3/5/2013'), 431.14),
    new stock_price_1.StockPrice(new Date('3/6/2013'), 425.66),
    new stock_price_1.StockPrice(new Date('3/7/2013'), 430.58),
    new stock_price_1.StockPrice(new Date('3/8/2013'), 431.72),
    new stock_price_1.StockPrice(new Date('3/11/2013'), 437.87),
    new stock_price_1.StockPrice(new Date('3/12/2013'), 428.43),
    new stock_price_1.StockPrice(new Date('3/13/2013'), 428.35),
    new stock_price_1.StockPrice(new Date('3/14/2013'), 432.5),
    new stock_price_1.StockPrice(new Date('3/15/2013'), 443.66),
    new stock_price_1.StockPrice(new Date('3/18/2013'), 455.72),
    new stock_price_1.StockPrice(new Date('3/19/2013'), 454.49),
    new stock_price_1.StockPrice(new Date('3/20/2013'), 452.08),
    new stock_price_1.StockPrice(new Date('3/21/2013'), 452.73),
    new stock_price_1.StockPrice(new Date('3/22/2013'), 461.91),
    new stock_price_1.StockPrice(new Date('3/25/2013'), 463.58),
    new stock_price_1.StockPrice(new Date('3/26/2013'), 461.14),
    new stock_price_1.StockPrice(new Date('3/27/2013'), 452.08),
    new stock_price_1.StockPrice(new Date('3/28/2013'), 442.66),
    new stock_price_1.StockPrice(new Date('4/1/2013'), 428.91),
    new stock_price_1.StockPrice(new Date('4/2/2013'), 429.79),
    new stock_price_1.StockPrice(new Date('4/3/2013'), 431.99),
    new stock_price_1.StockPrice(new Date('4/4/2013'), 427.72),
    new stock_price_1.StockPrice(new Date('4/5/2013'), 423.2),
    new stock_price_1.StockPrice(new Date('4/8/2013'), 426.21),
    new stock_price_1.StockPrice(new Date('4/9/2013'), 426.98),
    new stock_price_1.StockPrice(new Date('4/10/2013'), 435.69),
    new stock_price_1.StockPrice(new Date('4/11/2013'), 434.33),
    new stock_price_1.StockPrice(new Date('4/12/2013'), 429.8),
    new stock_price_1.StockPrice(new Date('4/15/2013'), 419.85),
    new stock_price_1.StockPrice(new Date('4/16/2013'), 426.24),
    new stock_price_1.StockPrice(new Date('4/17/2013'), 402.8),
    new stock_price_1.StockPrice(new Date('4/18/2013'), 392.05),
    new stock_price_1.StockPrice(new Date('4/19/2013'), 390.53),
    new stock_price_1.StockPrice(new Date('4/22/2013'), 398.67),
    new stock_price_1.StockPrice(new Date('4/23/2013'), 406.13),
    new stock_price_1.StockPrice(new Date('4/24/2013'), 405.46),
    new stock_price_1.StockPrice(new Date('4/25/2013'), 408.38),
    new stock_price_1.StockPrice(new Date('4/26/2013'), 417.2),
    new stock_price_1.StockPrice(new Date('4/29/2013'), 430.12),
    new stock_price_1.StockPrice(new Date('4/30/2013'), 442.78),
    new stock_price_1.StockPrice(new Date('5/1/2013'), 439.29),
    new stock_price_1.StockPrice(new Date('5/2/2013'), 445.52),
    new stock_price_1.StockPrice(new Date('5/3/2013'), 449.98),
    new stock_price_1.StockPrice(new Date('5/6/2013'), 460.71),
    new stock_price_1.StockPrice(new Date('5/7/2013'), 458.66),
    new stock_price_1.StockPrice(new Date('5/8/2013'), 463.84),
    new stock_price_1.StockPrice(new Date('5/9/2013'), 456.77),
    new stock_price_1.StockPrice(new Date('5/10/2013'), 452.97),
    new stock_price_1.StockPrice(new Date('5/13/2013'), 454.74),
    new stock_price_1.StockPrice(new Date('5/14/2013'), 443.86),
    new stock_price_1.StockPrice(new Date('5/15/2013'), 428.85),
    new stock_price_1.StockPrice(new Date('5/16/2013'), 434.58),
    new stock_price_1.StockPrice(new Date('5/17/2013'), 433.26),
    new stock_price_1.StockPrice(new Date('5/20/2013'), 442.93),
    new stock_price_1.StockPrice(new Date('5/21/2013'), 439.66),
    new stock_price_1.StockPrice(new Date('5/22/2013'), 441.35)
];
//# sourceMappingURL=mcda.js.map