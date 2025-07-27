#include <iostream>
#include "solver.h"
using namespace std;

bool solverPuzzle (int grid[9][9]){
    for (int row = 0; row < 9 ; row++){
        for (int col = 0; col < 9; col++){
            if (grid[row][col] == 0){
                for (int num = 1; num <=9 ; ++num){
                    if (isValid(grid, row, col, num)){
                        grid[row][col] = num;
                        if(solverPuzzle(grid)){
                            return true;
                        }
                        grid[row][col] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}

bool isValid(int grid[9][9], int row, int col, int num){
    for (int i=0; i<9; i++){
        if (grid[row][i] == num || grid[i][col] == num)
            return false;
        if (grid[3 * (row / 3) + (i / 3)][3 * (col / 3) + (i % 3)] == num)
            return false;
    }
    return true;
}

void printGrid(int grid[9][9]){
    for (int row = 0; row <9; row++){
        for (int col = 0; col < 9; ++col){
            cout << grid[row][col] << " ";
        }
        cout << endl;
    }
    cout <<endl;
}