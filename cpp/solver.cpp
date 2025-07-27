#include <iostream>
// #include "solver.h"
using namespace std;

extern "C" {
    bool solverPuzzle (int * grid);
    bool isValid(int* grid, int row, int col, int num);
}

extern "C"{


bool solverPuzzle (int * grid){
    for (int row = 0; row < 9 ; row++){
        for (int col = 0; col < 9; col++){
            if (grid[row * 9 + col] == 0){
                for (int num = 1; num <=9 ; ++num){
                    if (isValid(grid, row, col, num)){
                        grid[row * 9 + col] = num;
                        if(solverPuzzle(grid)){
                            return true;
                        }
                        grid[row * 9 + col] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}

bool isValid(int* grid, int row, int col, int num){
    for (int i=0; i<9; i++){
        if (grid[row * 9 + i] == num)
            return false;
        if (grid[i * 9 + col] == num)
            return false;
    }
    return true;
}

}