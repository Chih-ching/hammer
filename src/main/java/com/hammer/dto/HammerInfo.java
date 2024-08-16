package com.hammer.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;

@Data
@Getter
@Setter
public class HammerInfo {
    private String name;
    private Integer num; //該商品有多少數量
    private Integer price;
    private ArrayList accountList;
}
