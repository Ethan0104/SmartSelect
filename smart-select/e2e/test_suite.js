function getElementByDataTestId(dataTestId) {
  return document.querySelector(`[data-testid="${dataTestId}"]`)
}

const singlePatternTestSuite = (pattern) => {
    const patternPart1 = pattern.slice(0, Math.floor(pattern.length / 2))
    const patternPart2 = pattern.slice(Math.floor(pattern.length / 2), pattern.length)
    return [
        {
            id: "oneParagraph",
            testContents: `<p>Hi, please select ${pattern} this thing here.</p>`,
        },
        {
            id: "patternInChildElement",
            testContents: `<p>Hi, please select <span>${pattern}</span> this thing here.</p>`,
        },
        {
            id: "patternSplitBetweenTwoElements",
            testContents: `<p>Hi, please select <b>${patternPart1}</b>${patternPart2} this thing here.</p>`,
        },
        {
            id: "doubleParentNesting",
            testContents: `<p>Hi, please select <b><i>${patternPart1}</i></b>${patternPart2} this thing here.</p>`,
        }
    ]
}

function reloadTest() {
    // get necessary elements
    const testSelectorElement = getElementByDataTestId("testSelector")
    const patternInputElement = getElementByDataTestId("testPatternInput")
    const currentTestCaseElement = getElementByDataTestId("testCase")

    // set up the test suite
    const pattern = patternInputElement.value
    const testCaseId = testSelectorElement.value
    const testSuite = singlePatternTestSuite(pattern)

    // populate test contents
    const currentTestCase = testSuite.find((testCase) => testCase.id === testCaseId)
    currentTestCaseElement.innerHTML = currentTestCase.testContents
}

// put all test cases into the dropdown select element, only need to do this once
let testSelectorElement = getElementByDataTestId("testSelector")
testSelectorElement.innerHTML = singlePatternTestSuite("whatever").map((testCase) => {
    return `<option value="${testCase.id}">${testCase.id}</option>`
}).join("")
testSelectorElement.addEventListener("change", (event) => {
    reloadTest()
})

// set up the pattern input element
let patternInputElement = getElementByDataTestId("testPatternInput")
patternInputElement.addEventListener("input", (event) => {
    reloadTest()
})

reloadTest()
