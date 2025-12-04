# DataVis Assignment 2: Interactive Multivariate Visualization

This repository contains the solution for Assignment 2 of the DataVis course at TU Dresden, focusing on multivariate data visualization.

## Team Members
- Syed Muhammad Asad

## Project Description

This project implements an interactive scatterplot visualization of a car dataset using D3.js. The visualization encodes four attributes simultaneously:
- **X-axis**: Engine Size (liters)
- **Y-axis**: Horsepower (HP)
- **Circle Size**: Retail Price
- **Circle Color**: Car Type (Sedan, SUV, Sports Car, Wagon)

### Features Implemented

✅ **Part 1: Interactive Scatterplot**
- Multivariate scatterplot with 4 encoded attributes
- Proper axes with labels
- Color-coded legend for car types
- Interactive hover tooltips showing quick information
- Click interaction to display detailed information for 6 attributes
- **BONUS**: Star plot visualization showing performance metrics

✅ **Part 2: Theoretical Questions** (see `assignment2_answers.txt`)
- Scatterplot matrix principles explained
- Mathematical formula for number of plots
- Sketch of scatterplot matrix
- Advantages and disadvantages analysis

### Technologies Used
- **D3.js v5** - Data visualization library
- **HTML5/CSS3** - Structure and styling
- **Vanilla JavaScript** - Logic and interactions

### Data Attributes Displayed on Click
1. Car Name
2. Retail Price
3. Engine Size
4. Horsepower
5. City MPG
6. Highway MPG

## Local Development

### Prerequisites
[Node.js](https://nodejs.org/en) installed on your system.

### Installation
Install the `serve` package globally:
```bash
npm install serve --global
```

### Running the Application
Start the local server:
```bash
serve -p 8000
```

Then open your browser and navigate to [http://localhost:8000](http://localhost:8000).

**Alternative development environments**: You can also use [Vite](https://vite.dev/), [Flask (Python)](https://flask.palletsprojects.com/en/stable/), or similar tools.

## Project Structure
```
datavis-a2/
├── index.html              # Main HTML file
├── style.css               # Styling for the visualization
├── main.js                 # D3.js visualization logic
├── cars.csv                # Car dataset (with some errors that are cleaned)
├── d3.v5.min.js           # D3.js library
├── assignment2_answers.txt # Part 2 theoretical answers
├── scatterplot_matrix_sketch.png # Hand-drawn sketch
└── README.md               # This file
```

## How to Use the Visualization

1. **Explore the data**: Hover over any circle to see quick information about that car
2. **View details**: Click on any circle to see detailed information and a star plot
3. **Understand encoding**:
   - Larger circles = More expensive cars
   - Different colors = Different car types
   - Position shows engine size vs horsepower relationship

## Data Cleaning

The original dataset contains some errors (as mentioned in the instructions). The code implements data cleaning to:
- Convert string values to numbers
- Filter out entries with missing or invalid data (0 or negative values)
- Handle edge cases gracefully

## Debugging

Use your browser's development tools:
- **Chrome/Edge**: Press `Ctrl+J` (Windows/Linux) or `Cmd+J` (Mac) to open the console
- Check the console for data loading messages and any errors
- Use the Elements tab to inspect SVG structure

## AI Tools Acknowledgment

This project was developed with assistance from Claude (Anthropic's AI assistant) for:
- Code structure and D3.js implementation
- Best practices in data visualization
- Debugging and optimization
- Documentation

The AI was used as a learning tool and coding assistant, while all design decisions and understanding of concepts remain with the team.

## References and Sources

- [D3.js Documentation](https://d3js.org/)
- [Observable D3 Examples](https://observablehq.com/@d3)
- TU Dresden DataVis Course Materials
- [Mike Bostock's Scatterplot Examples](https://observablehq.com/@d3/scatterplot)

## License

This project is created for educational purposes as part of the DataVis course at TU Dresden. 
