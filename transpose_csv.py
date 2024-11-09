import pandas as pd
import sys

def transpose_csv(input_file, output_file):
    try:
        # Read the CSV file with a specified encoding
        df = pd.read_csv(input_file, encoding='latin1')  # Try 'latin1' encoding
        # Transpose the DataFrame
        df_transposed = df.T
        # Save the transposed DataFrame to a new CSV file
        df_transposed.to_csv(output_file, index=True)
        
        print(f"Transposed file saved as {output_file}")
    
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python transpose_csv.py <input_file.csv> <output_file.csv>")
    else:
        input_file = sys.argv[1]
        output_file = sys.argv[2]
        transpose_csv(input_file, output_file)

