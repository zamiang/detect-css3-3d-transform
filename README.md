## Detect CSS3 3D Transform Support via User Agent sniffing

This script detects CSS3 3D Transform support across browsers

Front-end development is messy in today's fragmented world. At Art.sy,
our goal is to do what it takes to provide an incredible experience
for *all* of our users (IE8+, iOS and the usual suspects). Deploying
bleeding edge tech, like CSS 3d transforms, is an exercise in
compromising principals for practicality -- and managing these
'compromises' in well documented code.

We looked to Modernizr's feature detection approach to provide us with
a reliable way to detect CSS3 3D transform support across browsers. They have some
[well](https://github.com/Modernizr/Modernizr/issues/590)
[documented](https://github.com/Modernizr/Modernizr/issues/465)
[struggles](https://github.com/Modernizr/Modernizr/issues/240) around
the issue. After flipping most of the tables in the office ┻━┻ ︵ヽ
(`Д´)ﾉ︵﻿ ┻━┻ , we settled on useragent sniffing as the most robust
method for detecting CSS3 3D transform support. But why did none
of the available methods work for us?

CSS3 3D transforms involve interaction between the browser and the
graphics card. The browser may be able to parse the 3D declarations
but may not be able to properly instruct the graphics card in how to
render your page. There are many possible outcomes ranging from the
page rendering with lines across it (Safari 4) to the page rendering
beautifully then crashing the browser seconds later (Safari on
iOS4). Any 'feature detection' approach would unacceptably flag these
as 'supports CSS3 3D transforms'. This is one case where 'feature
detection' fails and user agent sniffing (and lots of testing) wins
hands down.

Most feature detection assumes a 'supports' or 'does not support'
binary. This is not the case with CSS3 3D Transforms - there is a
'gradient of support'.

CSS3 3D transform support can be separated into 4 levels:

1. Reliably supports 3D transforms across most machines. For example:
Safari 6
2. Can parse and apply 3D transform declarations but ignores the 3D
parts. For example: Chrome on a Retina MacBook Pro.
3. Can parse and apply 3D transform declarations but renders in
unacceptable ways. For example: Safari 4 and Safari 4/5 on Windows
show lines across the page.
4. Cannot apply 3D transform declarations in any way. For example:
IE or Firefox < v10

This returns 'true' for 1 and 2 but false for 3 and 4.
