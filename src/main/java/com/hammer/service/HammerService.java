package com.hammer.service;

import com.hammer.dto.HammerInfo;
import com.hammer.dto.ProductInfo;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Locale;
import java.util.Map;
import java.util.TreeMap;

@Service
public class HammerService {

    public Map<String, ArrayList<ProductInfo>> getReport(ArrayList<HammerInfo> hammerList) {
        Map<String, ArrayList<ProductInfo>> reportMap = new TreeMap<>();
        for (HammerInfo hammer : hammerList) {
            if (hammer.getShow()) {
                String productId = hammer.getId();
                String productName = hammer.getName();
                Integer price = hammer.getPrice();
                ArrayList<String> accountArr = hammer.getAccountList();
                for (String account : accountArr) {
                    account=account.toLowerCase(Locale.ROOT);
                    if (reportMap.containsKey(account)) {
                        Boolean flag = false;
                        ArrayList<ProductInfo> productList = reportMap.get(account);
                        for(ProductInfo p:productList){
                            if (p.getId().equals(productId)) {
                                flag=true;
                                p.setNum((p.getNum() + 1));
                            }
                        }
                        if(!flag){
                            ProductInfo productInfo = new ProductInfo();
                            productInfo.setId(productId);
                            productInfo.setName(productName);
                            productInfo.setPrice(price);
                            productInfo.setNum(1);
                            productList.add(productInfo);
                        }
                    } else {
                        ArrayList<ProductInfo> productInfos = new ArrayList<>();
                        ProductInfo productInfo = new ProductInfo();
                        productInfo.setId(productId);
                        productInfo.setName(productName);
                        productInfo.setPrice(price);
                        productInfo.setNum(1);
                        productInfos.add(productInfo);
                        reportMap.put(account, productInfos);
                    }
                }
            }
        }

        return reportMap;
    }

}
