/**
 * Defines Pictorial Stacked Series.
 */
import * as tslib_1 from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { PyramidSeries, PyramidSeriesDataItem } from "./PyramidSeries";
import { Sprite } from "../../core/Sprite";
import { registry } from "../../core/Registry";
import * as $math from "../../core/utils/Math";
import * as $type from "../../core/utils/Type";
import { percent } from "../../core/utils/Percent";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
//@todo: sequenced?
/**
 * Defines a [[DataItem]] for [[PictorialStackedSeries]].
 *
 * @see {@link DataItem}
 */
var PictorialStackedSeriesDataItem = /** @class */ (function (_super) {
    tslib_1.__extends(PictorialStackedSeriesDataItem, _super);
    /**
     * Constructor
     */
    function PictorialStackedSeriesDataItem() {
        var _this = _super.call(this) || this;
        _this.className = "PictorialStackedSeriesDataItem";
        _this.applyTheme();
        return _this;
    }
    return PictorialStackedSeriesDataItem;
}(PyramidSeriesDataItem));
export { PictorialStackedSeriesDataItem };
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Defines [[Series]] for a PictorialStacked series on a [[SlicedChart]].
 *
 * @see {@link IPictorialStackedSeriesEvents} for a list of available Events
 * @see {@link IPictorialStackedSeriesAdapters} for a list of available Adapters
 * @see {@link https://www.amcharts.com/docs/v4/chart-types/sliced-chart/} for documentation
 * @important
 */
var PictorialStackedSeries = /** @class */ (function (_super) {
    tslib_1.__extends(PictorialStackedSeries, _super);
    /**
     * Constructor
     */
    function PictorialStackedSeries() {
        var _this = _super.call(this) || this;
        _this.className = "PictorialStackedSeries";
        _this.topWidth = percent(100);
        _this.bottomWidth = percent(100);
        _this.valueIs = "height";
        _this.applyTheme();
        _this.events.on("maxsizechanged", _this.resizeMask, _this);
        _this._maskSprite = _this.slicesContainer.createChild(Sprite);
        _this._maskSprite.zIndex = 100;
        return _this;
    }
    /**
     * (Re)validates the whole series, effectively causing it to redraw.
     *
     * @ignore Exclude from docs
     */
    PictorialStackedSeries.prototype.validate = function () {
        _super.prototype.validate.call(this);
        this.resizeMask();
    };
    /**
     * Sizes the mask to fit the series.
     *
     * @ignore
     */
    PictorialStackedSeries.prototype.resizeMask = function () {
        var maxWidth = this.slicesContainer.maxWidth;
        var maxHeight = this.slicesContainer.maxHeight;
        var maskSprite = this._maskSprite;
        maskSprite.validate();
        var pictureWidth = maskSprite.measuredWidth / maskSprite.scale;
        var pictureHeight = maskSprite.measuredHeight / maskSprite.scale;
        var scale = $math.min(maxHeight / pictureHeight, maxWidth / pictureWidth);
        var newWidth = $math.min(maxWidth, pictureWidth * scale);
        var newHeight = $math.min(maxHeight, pictureHeight * scale);
        maskSprite.scale = scale;
        if (this.orientation == "vertical") {
            this.topWidth = newWidth + 4;
            this.bottomWidth = newWidth + 4;
            this.pyramidHeight = newHeight;
            maskSprite.x = maxWidth / 2;
            maskSprite.y = newHeight / 2;
        }
        else {
            this.topWidth = newHeight + 4;
            this.bottomWidth = newHeight + 4;
            this.pyramidHeight = newWidth;
            maskSprite.valign = "middle";
            maskSprite.x = newWidth / 2;
            maskSprite.y = maxHeight / 2;
        }
        maskSprite.verticalCenter = "middle";
        maskSprite.horizontalCenter = "middle";
        this.slicesContainer.mask = maskSprite;
    };
    /**
     * Sets defaults that instantiate some objects that rely on parent, so they
     * cannot be set in constructor.
     */
    PictorialStackedSeries.prototype.applyInternalDefaults = function () {
        _super.prototype.applyInternalDefaults.call(this);
        if (!$type.hasValue(this.readerTitle)) {
            this.readerTitle = this.language.translate("Pyramid Series");
        }
    };
    /**
     * Returns a new/empty DataItem of the type appropriate for this object.
     *
     * @see {@link DataItem}
     * @return {PictorialStackedSeriesDataItem} Data Item
     */
    PictorialStackedSeries.prototype.createDataItem = function () {
        return new PictorialStackedSeriesDataItem();
    };
    Object.defineProperty(PictorialStackedSeries.prototype, "maskSprite", {
        /**
         * A [[Sprite]] element that is used as a series mask.
         *
         * If set, this element's shape will be used to apply shape to the whole
         * stacked pictorial series.
         *
         * You can use this element's `path` property to set an SVG path for the
         * shape:
         *
         * ```TypeScript
         * let iconPath = "M511.82,329.991c-0.256-1.212-1.064-2.244-2.192-2.784l-24.396-11.684c17.688-29.776,11.804-68.912-15.58-91.88 c-53.756-45.084-131.696-70.936-213.828-70.936c-82.128,0-160.068,25.856-213.82,70.936c-27.416,22.992-33.28,62.18-15.524,91.972 L2.276,327.203c-1.128,0.54-1.936,1.572-2.192,2.792c-0.256,1.22,0.08,2.496,0.896,3.436l21.204,24.388 c0.764,0.88,1.868,1.376,3.02,1.376c0.084,0,0.172,0,0.26-0.008c1.244-0.084,2.384-0.74,3.072-1.776l14.852-22.376 c12.648,10.112,28.392,15.776,44.916,15.776c16.872,0,33.284-5.98,46.232-16.836c27.828-23.34,73.172-37.272,121.288-37.272 c48.12,0,93.464,13.932,121.296,37.272c12.944,10.856,29.36,16.836,46.228,16.836c16.596,0,32.4-5.724,45.08-15.916l14.94,22.512 c0.692,1.04,1.824,1.696,3.076,1.776c0.084,0.008,0.172,0.008,0.256,0.008c1.156,0,2.256-0.496,3.02-1.376l21.2-24.388C511.74,332.487,512.068,331.211,511.82,329.991z";
         * // ...
         * series.maskSprite.path = iconPath;
         * ```
         * ```JavaScript
         * let iconPath = "M511.82,329.991c-0.256-1.212-1.064-2.244-2.192-2.784l-24.396-11.684c17.688-29.776,11.804-68.912-15.58-91.88 c-53.756-45.084-131.696-70.936-213.828-70.936c-82.128,0-160.068,25.856-213.82,70.936c-27.416,22.992-33.28,62.18-15.524,91.972 L2.276,327.203c-1.128,0.54-1.936,1.572-2.192,2.792c-0.256,1.22,0.08,2.496,0.896,3.436l21.204,24.388 c0.764,0.88,1.868,1.376,3.02,1.376c0.084,0,0.172,0,0.26-0.008c1.244-0.084,2.384-0.74,3.072-1.776l14.852-22.376 c12.648,10.112,28.392,15.776,44.916,15.776c16.872,0,33.284-5.98,46.232-16.836c27.828-23.34,73.172-37.272,121.288-37.272 c48.12,0,93.464,13.932,121.296,37.272c12.944,10.856,29.36,16.836,46.228,16.836c16.596,0,32.4-5.724,45.08-15.916l14.94,22.512 c0.692,1.04,1.824,1.696,3.076,1.776c0.084,0.008,0.172,0.008,0.256,0.008c1.156,0,2.256-0.496,3.02-1.376l21.2-24.388C511.74,332.487,512.068,331.211,511.82,329.991z";
         * // ...
         * series.maskSprite.path = iconPath;
         * ```
         * ```JSON
         * let iconPath = "M511.82,329.991c-0.256-1.212-1.064-2.244-2.192-2.784l-24.396-11.684c17.688-29.776,11.804-68.912-15.58-91.88 c-53.756-45.084-131.696-70.936-213.828-70.936c-82.128,0-160.068,25.856-213.82,70.936c-27.416,22.992-33.28,62.18-15.524,91.972 L2.276,327.203c-1.128,0.54-1.936,1.572-2.192,2.792c-0.256,1.22,0.08,2.496,0.896,3.436l21.204,24.388 c0.764,0.88,1.868,1.376,3.02,1.376c0.084,0,0.172,0,0.26-0.008c1.244-0.084,2.384-0.74,3.072-1.776l14.852-22.376 c12.648,10.112,28.392,15.776,44.916,15.776c16.872,0,33.284-5.98,46.232-16.836c27.828-23.34,73.172-37.272,121.288-37.272 c48.12,0,93.464,13.932,121.296,37.272c12.944,10.856,29.36,16.836,46.228,16.836c16.596,0,32.4-5.724,45.08-15.916l14.94,22.512 c0.692,1.04,1.824,1.696,3.076,1.776c0.084,0.008,0.172,0.008,0.256,0.008c1.156,0,2.256-0.496,3.02-1.376l21.2-24.388C511.74,332.487,512.068,331.211,511.82,329.991z";
         * // ...
         * {
         *   // ...
         *   "series": [{
         *     "type": "PictorialStackedSeries",
         *     // ...
         *     "maskSprite": {
         *       "path": iconPath
         *     }
         *   }]
         * }
         * ```
         *
         * @return {Sprite} Mask sprite
         */
        get: function () {
            return this._maskSprite;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Inits FunnelSlice.
     *
     * @param  {FunnelSlice} slice to init
     */
    PictorialStackedSeries.prototype.initSlice = function (slice) {
        _super.prototype.initSlice.call(this, slice);
        var hs = slice.states.getKey("hover");
        if (hs) {
            hs.properties.expandDistance = 0;
        }
    };
    return PictorialStackedSeries;
}(PyramidSeries));
export { PictorialStackedSeries };
/**
 * bboxter class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["PictorialStackedSeries"] = PictorialStackedSeries;
registry.registeredClasses["PictorialStackedSeriesDataItem"] = PictorialStackedSeriesDataItem;
//# sourceMappingURL=PictorialStackedSeries.js.map