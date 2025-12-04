#!/usr/bin/env python3
"""
Generate a scatterplot matrix sketch for Assignment 2
Shows 3 attributes from the cars dataset with 3 example cars
"""

import matplotlib.pyplot as plt
import numpy as np
import pandas as pd

# Create figure with subplots
fig, axes = plt.subplots(3, 3, figsize=(12, 12))
fig.suptitle('Scatterplot Matrix (SPLOM) - Cars Dataset Example',
             fontsize=16, fontweight='bold', y=0.995)

# Read actual data from cars.csv to use realistic values
try:
    df = pd.read_csv('cars.csv')
    # Select 3 interesting cars
    cars_to_plot = [
        'Acura MDX',
        'BMW M3 coupe 2dr',
        'Toyota Prius (gas/electric)'
    ]

    # Try to find these cars, or use first 3 if not found
    selected_data = []
    for car_name in cars_to_plot:
        car_data = df[df['Name'].str.contains(car_name.split()[0], case=False, na=False)]
        if len(car_data) > 0:
            selected_data.append(car_data.iloc[0])

    # If we don't have 3 cars, just use first 3
    if len(selected_data) < 3:
        selected_data = [df.iloc[i] for i in [3, 42, 1]]  # Pick diverse cars

    # Extract attributes
    hp_values = [float(car['Horsepower(HP)']) for car in selected_data]
    mpg_values = [float(car['City Miles Per Gallon']) for car in selected_data]
    engine_values = [float(car['Engine Size (l)']) for car in selected_data]
    car_names = [car['Name'] for car in selected_data]

except:
    # Fallback to example data if CSV reading fails
    car_names = ['Acura MDX', 'BMW M3', 'Toyota Prius']
    hp_values = [265, 333, 110]
    mpg_values = [17, 16, 48]
    engine_values = [3.5, 3.2, 1.5]

# Attributes for the matrix
attributes = ['Horsepower\n(HP)', 'City MPG', 'Engine Size\n(liters)']
data_arrays = [hp_values, mpg_values, engine_values]

# Colors for the three cars
colors = ['#e74c3c', '#3498db', '#2ecc71']  # Red, Blue, Green
markers = ['o', 's', '^']  # Circle, Square, Triangle

# Create the scatterplot matrix
for i in range(3):
    for j in range(3):
        ax = axes[i, j]

        if i == j:
            # Diagonal: Show attribute name and simple distribution
            ax.text(0.5, 0.5, attributes[i],
                   ha='center', va='center',
                   fontsize=14, fontweight='bold',
                   bbox=dict(boxstyle='round', facecolor='wheat', alpha=0.8))
            ax.set_xlim(0, 1)
            ax.set_ylim(0, 1)
            ax.axis('off')
        else:
            # Off-diagonal: Show scatterplot
            x_data = data_arrays[j]
            y_data = data_arrays[i]

            # Plot each car as a point
            for k in range(3):
                ax.scatter(x_data[k], y_data[k],
                          c=colors[k], marker=markers[k],
                          s=200, alpha=0.7, edgecolors='black', linewidth=2,
                          label=car_names[k] if i == 0 and j == 1 else "")

            # Add grid
            ax.grid(True, alpha=0.3, linestyle='--')
            ax.set_axisbelow(True)

            # Labels only on edges
            if j == 0:  # Leftmost column
                ax.set_ylabel(attributes[i], fontsize=11, fontweight='bold')
            else:
                ax.set_ylabel('')

            if i == 2:  # Bottom row
                ax.set_xlabel(attributes[j], fontsize=11, fontweight='bold')
            else:
                ax.set_xlabel('')

            # Make it look hand-drawn style
            ax.spines['top'].set_linewidth(2)
            ax.spines['right'].set_linewidth(2)
            ax.spines['bottom'].set_linewidth(2)
            ax.spines['left'].set_linewidth(2)

# Add legend outside the plot
handles = [plt.Line2D([0], [0], marker=markers[k], color='w',
                     markerfacecolor=colors[k], markersize=12,
                     markeredgecolor='black', markeredgewidth=2,
                     label=car_names[k])
          for k in range(3)]
fig.legend(handles=handles, loc='lower center', ncol=3,
          fontsize=12, frameon=True, fancybox=True, shadow=True,
          bbox_to_anchor=(0.5, -0.02))

# Add explanatory text
fig.text(0.5, 0.96,
         'Each cell shows the relationship between two attributes for 3 selected cars',
         ha='center', fontsize=11, style='italic', color='#666666')

# Adjust layout
plt.tight_layout(rect=[0, 0.02, 1, 0.98])

# Save the figure
plt.savefig('scatterplot_matrix_sketch.png', dpi=300, bbox_inches='tight',
            facecolor='white', edgecolor='none')
print("✓ Scatterplot matrix sketch saved as 'scatterplot_matrix_sketch.png'")

plt.savefig('scatterplot_matrix_sketch.jpg', dpi=300, bbox_inches='tight',
            facecolor='white', edgecolor='none')
print("✓ Scatterplot matrix sketch also saved as 'scatterplot_matrix_sketch.jpg'")

plt.close()
