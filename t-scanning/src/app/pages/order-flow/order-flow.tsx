import React, { useState, useEffect } from "react";
import { TCustomCard, TFooter } from '@tap-n-taste/ui';
import SearchIcon from "../../../assets/mynaui_search.png";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@tap-n-taste/utils";
import { deleteMenuItemFromOrder, fetchOrdersByUserId } from "libs/utils/src/store/orderSlice";

export const OrderComplete: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { orders, loading, error } = useSelector((state: RootState) => state.order);
  const userId = useSelector((state: RootState) => state.auth.userData?.id);

  useEffect(() => {
      dispatch(fetchOrdersByUserId(userId));
  }, [dispatch,orders.length]);


  const handleDeleteMenuItem = async (orderId:any,id:any) => {
    try {
      await dispatch(deleteMenuItemFromOrder({ orderId, menuId: id })).unwrap();
      console.log('Item deleted successfully',orders);
    } catch (error) {
      console.error('Failed to delete item:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const renderOrderItems = (items: any[],orderId:any) => (
    items.map((item, index) => (
      <TCustomCard
        key={item.menuId._id || index}
        image={item.menuId.banner}
        title={item.menuId.name}
        description={item.menuId.description}
        rating={item.menuId.ratings.averageRating}
        price={item.menuId.price}
        veg={item.menuId.isVeg}
        quantity={item?.quantity}
        isOrderCard={true}
        orderId={orderId}
        id={item.menuId._id}
        handleDeleteMenuItems={handleDeleteMenuItem}
      />
    ))
  );

  const activeOrders = orders.filter(order => order.orderStatus === "Pending");
  const completedOrders = orders.filter(order => order.orderStatus === "Completed");

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "16px",
        fontFamily: "Poppins, sans-serif",
        boxSizing: "border-box",
      }}
    >
      {/* Main Container */}
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          padding: "16px",
          boxSizing: "border-box",
          overflow: "hidden",
        }}
      >
        {/* Top Heading */}
        <div style={{ marginBottom: "12px" }}>
          <h3 style={{ fontSize: "18px", margin: "0", color: "#000" }}>
            &lt; Orders
          </h3>
        </div>

        {/* Order Filters */}
        <div style={{ display: "flex", justifyContent: "space-between", margin: "12px 0" }}>
          {["Active", "Completed", "All"].map((label, index) => (
            <button
              key={index}
              style={{
                flex: 1,
                margin: "0 5px",
                padding: "6px 0",
                border: "none",
                borderRadius: "20px",
                backgroundColor: label === "Active" ? "#ff4c61" : "#e6e6e6",
                color: "#fff",
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Search Box */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "white",
            borderRadius: "8px",
            padding: "8px",
            margin: "12px 0",
            border: "1px solid #e6e6e6",
            width: "100%",
            overflow: "hidden",
          }}
        >
          <img src={SearchIcon} alt="Search" style={{ width: "18px", marginRight: "8px" }} />
          <h4 style={{ margin: 0, fontSize: "14px", color: "#9e9e9e" }}>
            Search by Dish or Restaurant
          </h4>
        </div>

        {/* Active Orders */}
        <div>
          <h4
            style={{
              fontSize: "16px",
              margin: "12px 0",
              color: "#000",
            }}
          >
            Active Orders
          </h4>
          {activeOrders.length > 0 ? (
            activeOrders.map(order => (
              <div key={order._id}>
                <h5 style={{ fontSize: "14px", color: "#ff4c61" }}>
                  {order.items.length?`Order ID: ${order._id}`:''}
                </h5>
                {renderOrderItems(order.items,order._id)}
              </div>
            ))
          ) : (
            <p style={{ fontSize: "14px", color: "#9e9e9e" }}>No active orders</p>
          )}
        </div>

        {/* Completed Orders */}
        <div>
          <h4
            style={{
              fontSize: "16px",
              margin: "12px 0",
              color: "#000",
            }}
          >
            Completed Orders
          </h4>
          {completedOrders.length > 0 ? (
            completedOrders.map(order => (
              <div key={order._id}>
                <h5 style={{ fontSize: "14px", color: "#4caf50" }}>
                  {order.items.length&&`Order ID: ${order._id}`}
                </h5>
                {renderOrderItems(order.items,order._id)}
              </div>
            ))
          ) : (
            <p style={{ fontSize: "14px", color: "#9e9e9e" }}>No completed orders</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderComplete;
