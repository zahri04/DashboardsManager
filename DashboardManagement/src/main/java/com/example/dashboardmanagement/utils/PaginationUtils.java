package com.example.dashboardmanagement.utils;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;
import java.util.stream.Collectors;

public final class PaginationUtils {



    public static void validatePagination(int page, int size) {
        if (page < 0) {
            throw new IllegalArgumentException("Page number cannot be negative");
        }
        if (size < 1 || size > 100) {
            throw new IllegalArgumentException("Page size must be between 1 and 100");
        }
    }


    public static Pageable createPageRequest(int pageNumber, int pageSize, List<String> sort) {

        // checking if there is no sorting included
        if( sort==null || sort.size()==0 ){
            return PageRequest.of(pageNumber,pageSize);
        }

        // creating List<Sort.order> to pass it to PageRequest.of()

        List<Sort.Order> orders=sort.stream()
                .map(item->item.split(","))
                .map(arr->new Sort.Order(
                        arr.length>1 && "desc".equalsIgnoreCase(arr[1]) ?
                                Sort.Direction.DESC:Sort.Direction.ASC
                        ,arr[0]

                )).collect(Collectors.toList());
        System.out.println(orders);
        return PageRequest.of(pageNumber,pageSize,Sort.by(orders));


    }
}
