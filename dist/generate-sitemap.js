'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g = Object.create((typeof Iterator === 'function' ? Iterator : Object).prototype);
    return (
      (g.next = verb(0)),
      (g['throw'] = verb(1)),
      (g['return'] = verb(2)),
      typeof Symbol === 'function' &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError('Generator is already executing.');
      while ((g && ((g = 0), op[0] && (_ = 0)), _))
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y['return']
                  : op[0]
                    ? y['throw'] || ((t = y['return']) && t.call(y), 0)
                    : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
var __spreadArray =
  (this && this.__spreadArray) ||
  function (to, from, pack) {
    if (pack || arguments.length === 2)
      for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from));
  };
Object.defineProperty(exports, '__esModule', { value: true });
var sitemap_1 = require('sitemap');
var fs_1 = require('fs');
var stream_1 = require('stream');
var path_1 = require('path');
var BASE_URL = 'https://skalafront.anaxistech.com';
var PAGES_DIR = path_1.default.join(process.cwd(), 'pages');
// --- 1. Get static routes from the /pages directory
function getStaticRoutes(dir, baseRoute) {
  if (dir === void 0) {
    dir = PAGES_DIR;
  }
  if (baseRoute === void 0) {
    baseRoute = '';
  }
  var entries = (0, fs_1.readdirSync)(dir);
  var routes = [];
  for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
    var entry = entries_1[_i];
    var fullPath = path_1.default.join(dir, entry);
    var stat = (0, fs_1.statSync)(fullPath);
    if (stat.isDirectory()) {
      if (entry === 'api') continue;
      routes = routes.concat(getStaticRoutes(fullPath, ''.concat(baseRoute, '/').concat(entry)));
    } else if (entry.endsWith('.tsx') || entry.endsWith('.js')) {
      if (entry.startsWith('_')) continue;
      var route = entry.replace(/\.tsx|\.js$/, '');
      if (route === 'index') route = '';
      routes.push(''.concat(baseRoute, '/').concat(route));
    }
  }
  return routes;
}
// --- 2. Load dynamic blog slugs from local JSON
function getBlogRoutes() {
  var filePath = path_1.default.join(process.cwd(), 'src', 'data', 'blogs.json');
  var blogs = JSON.parse((0, fs_1.readFileSync)(filePath, 'utf-8'));
  return blogs.map(function (b) {
    return '/blog/'.concat(b.slug);
  });
}
function generateSitemap() {
  return __awaiter(this, void 0, void 0, function () {
    var staticRoutes, blogRoutes, allRoutes, sitemapEntries, sitemap, xml, writeStream;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          staticRoutes = getStaticRoutes();
          blogRoutes = getBlogRoutes();
          allRoutes = __spreadArray(__spreadArray([], staticRoutes, true), blogRoutes, true);
          sitemapEntries = allRoutes.map(function (url) {
            return {
              url: url,
              changefreq: 'weekly',
              priority: 0.7,
            };
          });
          sitemap = new sitemap_1.SitemapStream({ hostname: BASE_URL });
          return [
            4 /*yield*/,
            (0, sitemap_1.streamToPromise)(
              stream_1.Readable.from(sitemapEntries).pipe(sitemap)
            ).then(function (data) {
              return data.toString();
            }),
          ];
        case 1:
          xml = _a.sent();
          writeStream = (0, fs_1.createWriteStream)('public/sitemap.xml');
          writeStream.write(xml);
          writeStream.end();
          console.log('✅ sitemap.xml created with static and dynamic routes!');
          return [2 /*return*/];
      }
    });
  });
}
generateSitemap().catch(console.error);
