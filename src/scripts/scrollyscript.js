const allMajors  = d3.selectAll(".g-major-categories");
const topThree   = d3.selectAll(".g-top-three");
const minorPaint = d3.selectAll(".g-minor-paint");
const minorUnsan = d3.selectAll(".g-minor-unsanitary");
const minorPlumb = d3.selectAll(".g-minor-plumbing");

// functions
function reset() {
    allMajors.classed('hidden', false).classed('fade_out', false);
    topThree.classed('hidden', true)
    minorPaint.classed('hidden', true).classed('paint-transform', false);
    minorUnsan.classed('hidden', true).classed('unsanitary-transform', false);
    minorPlumb.classed('hidden', true).classed('plumbing-transform', false);
    //these steps are for formatting, set to transparent
    d3.selectAll("#spacer").classed('transparent', true).classed('spacer_margin', true)
  }
reset();

function top_three() {
    topThree.classed('hidden', false)
    allMajors.classed('fade_out', true)
    minorPaint.classed('hidden', true)
    minorUnsan.classed('hidden', true)
    minorPlumb.classed('hidden', true)
}

function unsanitary() {
    topThree.classed('hidden', true)
    allMajors.classed('hidden', true)
    minorUnsan.classed('hidden', false).classed('unsanitary-transform', true);

    minorPaint.classed('hidden', true).classed('paint-transform', false);
    minorPlumb.classed('hidden', true).classed('plumbing-transform', false);
}

function paint() {
    topThree.classed('hidden', true)
    allMajors.classed('hidden', true)
    minorUnsan.classed('hidden', false).classed('unsanitary-transform', true);
    minorPaint.classed('hidden', false).classed('paint-transform', true);

    minorPlumb.classed('hidden', true).classed('plumbing-transform', false);
}

function plumbing() {
    topThree.classed('hidden', true)
    allMajors.classed('hidden', true)
    minorUnsan.classed('hidden', false).classed('unsanitary-transform', true);
    minorPaint.classed('hidden', false).classed('paint-transform', true);
    minorPlumb.classed('hidden', false).classed('plumbing-transform', true);
}


/* Scrollytelling code goes under here */
d3.select("#step-zero").on('stepin', function (e) {
    reset();
}).on('stepout', function (e) {
    reset();
})

d3.select("#step-one").on('stepin', function (e) {
    top_three();
})

d3.select("#step-two").on('stepin', function (e) {
    unsanitary();
})

d3.select("#step-five").on('stepout', function (e) {
    unsanitary();
})

d3.select("#step-six").on('stepin', function (e) {
    paint();
})

d3.select("#step-seven").on('stepin', function (e) {
    plumbing();
})

// scrolly stuff 
const scroller = scrollama();

scroller
    .setup({
        step: "#scrolly .scrolly-overlay .step",
        offset: 0.5,
        debug: false
    })
    .onStepEnter(function ({ element, index, direction }) {
        const event = new CustomEvent('stepin', { detail: { direction: direction } })
        element.dispatchEvent(event);
    })
    .onStepExit(function ({ element, index, direction }) {
        const event = new CustomEvent('stepout', { detail: { direction: direction } })
        element.dispatchEvent(event);
    });

window.addEventListener("resize", scroller.resize);