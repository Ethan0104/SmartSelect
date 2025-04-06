function getElementByDataTestId(dataTestId) {
    return document.querySelector(`[data-testid="${dataTestId}"]`)
}

const singlePatternTestSuite = (pattern) => {
    const patternPart1 = pattern.slice(0, Math.floor(pattern.length / 2))
    const patternPart2 = pattern.slice(
        Math.floor(pattern.length / 2),
        pattern.length
    )
    return [
        {
            id: 'oneParagraph',
            testContents: `<p>Hi, please select ${pattern} this thing here.</p>`,
        },
        {
            id: 'patternInChildElement',
            testContents: `<p>Hi, please select <span>${pattern}</span> this thing here.</p>`,
        },
        {
            id: 'patternSplitBetweenTwoElements',
            testContents: `<p>Hi, please select <b>${patternPart1}</b>${patternPart2} this thing here.</p>`,
        },
        {
            id: 'doubleParentNesting',
            testContents: `<p>Hi, please select <b><i>${patternPart1}</i></b>${patternPart2} this thing here.</p>`,
        },
    ]
}

const TEST_PATTERNS = [
    'dc11101b-52f8-40c9-849a-055084ba508c',
    'https://www.google.com',
    '/home/build/main_script.py',
    'relative/path/to/file.py',
    'relative/path/to/file-name.py',
]

function reloadTest() {
    // get necessary elements
    const testSelectorElement = getElementByDataTestId('testSelector')
    const currentTestCaseElement = getElementByDataTestId('testCase')

    // set up the test suite
    const testCaseId = testSelectorElement.value
    const testSuite = TEST_PATTERNS.map((pattern) =>
        singlePatternTestSuite(pattern)
    ).flat()

    // populate test contents
    const currentTestCase = testSuite.filter(
        (testCase) => testCase.id === testCaseId
    )
    const testCaseHTML = currentTestCase
        .map((testCase) => testCase.testContents)
        .join('')
    currentTestCaseElement.innerHTML = testCaseHTML
}

// put all test cases into the dropdown select element, only need to do this once
let testSelectorElement = getElementByDataTestId('testSelector')
testSelectorElement.innerHTML = singlePatternTestSuite('whatever')
    .map((testCase) => {
        return `<option value="${testCase.id}">${testCase.id}</option>`
    })
    .join('')
testSelectorElement.addEventListener('change', (event) => {
    reloadTest()
})

// set up the pattern input element
let patternInputElement = getElementByDataTestId('testPatternInput')
patternInputElement.addEventListener('input', (event) => {
    reloadTest()
})

reloadTest()
